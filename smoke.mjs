import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const client = new Client({ name: 'hirepulse-proxy-smoke', version: '1.0.0' });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: ['proxy.mjs'] }));
  const tools = await client.listTools();
  if (tools.tools.length !== 8) throw new Error('Expected eight tools');
  console.log(JSON.stringify({ toolCount: tools.tools.length, names: tools.tools.map(t => t.name) }));
} finally { await client.close(); }
