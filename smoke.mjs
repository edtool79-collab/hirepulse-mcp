import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const client = new Client({ name: 'hirepulse-proxy-smoke', version: '1.0.0' });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: ['proxy.mjs'] }));
  const tools = await client.listTools();
  const required = ['ask_hirepulse_advisor', 'get_google_ads_by_domain', 'get_company_profile', 'company_footprint_check', 'verified_merchant_json_badge'];
  if (tools.tools.length < 23 || required.some(name => !tools.tools.some(t => t.name === name))) throw new Error('Expected the full gateway tool catalog');
  console.log(JSON.stringify({ toolCount: tools.tools.length, names: tools.tools.map(t => t.name) }));
} finally { await client.close(); }
