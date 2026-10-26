import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
const client = new Client({ name: 'hirepulse-proxy-smoke', version: '1.0.0' });
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: ['proxy.mjs'] }));
  const tools = await client.listTools();
  const required = ['ask_hirepulse_advisor', 'get_google_ads_by_domain', 'get_company_profile', 'company_footprint_check', 'verified_merchant_json_badge'];
  if (tools.tools.length < 21 || required.some(name => !tools.tools.some(t => t.name === name))) throw new Error(`Expected at least 21 canonical gateway tools, got ${tools.tools.length}`);
  const aliases = ['00_ask_hirepulse_advisor', 'verify_domain_legitimacy_and_security'];
  if (tools.tools.some(t => aliases.includes(t.name))) throw new Error('Compatibility aliases must not duplicate discoverable tools');
  for (const tool of tools.tools) for (const [name, schema] of Object.entries(tool.inputSchema.properties ?? {})) {
    if (typeof schema.description !== 'string' || !schema.description.trim()) throw new Error(`Missing parameter description: ${tool.name}.${name}`);
  }
  console.log(JSON.stringify({ toolCount: tools.tools.length, names: tools.tools.map(t => t.name) }));
} finally { await client.close(); }
