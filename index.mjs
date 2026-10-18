#!/usr/bin/env node
// hirepulse-mcp: a stdio MCP server for Claude Desktop, Cursor, Windsurf and other clients.
// It relays every MCP message to the HirePulse remote server, and can pay tool calls with x402 (USDC on Base)
// when BUYER_PRIVATE_KEY is set, up to HIREPULSE_MAX_PRICE_USD per call.
import readline from 'node:readline';

const SERVER = process.env.HIREPULSE_MCP_URL ?? 'https://api.gethirepulse.xyz/mcp?ref=npx';
const NETWORK = process.env.HIREPULSE_NETWORK ?? 'eip155:8453';
const MAX_PRICE_USD = Number(process.env.HIREPULSE_MAX_PRICE_USD ?? '0.10');
const log = (text) => process.stderr.write(`hirepulse-mcp: ${text}\n`);
const send = (message) => process.stdout.write(JSON.stringify(message) + '\n');

let payer;
async function getPayer() {
  if (!process.env.BUYER_PRIVATE_KEY) return null;
  if (!payer) {
    const { x402Client } = await import('@x402/core/client');
    const { ExactEvmScheme } = await import('@x402/evm/exact/client');
    const { privateKeyToAccount } = await import('viem/accounts');
    payer = new x402Client().register(NETWORK, new ExactEvmScheme(privateKeyToAccount(process.env.BUYER_PRIVATE_KEY)));
  }
  return payer;
}

async function forward(message) {
  const response = await fetch(SERVER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'User-Agent': 'hirepulse-mcp/1.0' },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(180000),
  });
  if (message.id === undefined || response.status === 202) return null;
  return response.json();
}

async function handle(message) {
  try {
    let answer = await forward(message);
    if (!answer) return;
    const terms = answer.result?.structuredContent;
    // A paid tool answers with isError and the x402 terms; pay once and repeat the same call.
    if (message.method === 'tools/call' && answer.result?.isError && terms?.x402Version && Array.isArray(terms.accepts)) {
      const client = await getPayer();
      const offer = terms.accepts.find((a) => a.network === NETWORK) ?? terms.accepts[0];
      const price = Number(offer.amount) / 1e6;
      if (!client) log('free calls used. Set BUYER_PRIVATE_KEY (a wallet with a little USDC on Base) to pay per call.');
      else if (price > MAX_PRICE_USD) log(`${price} USDC is above HIREPULSE_MAX_PRICE_USD (${MAX_PRICE_USD}); not paid.`);
      else {
        const payment = await client.createPaymentPayload({ x402Version: terms.x402Version, resource: terms.resource, accepts: terms.accepts, extensions: terms.extensions });
        answer = await forward({ ...message, params: { ...message.params, _meta: { ...(message.params?._meta ?? {}), 'x402/payment': payment } } });
        log(`paid ${price} USDC for ${message.params?.name}`);
      }
    }
    send(answer);
  } catch (error) {
    if (message.id !== undefined) send({ jsonrpc: '2.0', id: message.id, error: { code: -32603, message: `HirePulse relay error: ${error.message}` } });
  }
}

const pending = new Set();
readline.createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  let message;
  try { message = JSON.parse(line); } catch { send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); return; }
  const job = handle(message).finally(() => pending.delete(job));
  pending.add(job);
}).on('close', async () => { await Promise.all(pending); process.exit(0); });
