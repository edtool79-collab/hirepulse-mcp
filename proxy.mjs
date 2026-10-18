#!/usr/bin/env node
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema,
  ListResourcesRequestSchema, ReadResourceRequestSchema,
  ListResourceTemplatesRequestSchema, ListPromptsRequestSchema,
  GetPromptRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// SDK handles negotiation, sessions and SSE. Payment challenges pass through.
const remote = new Client({ name: 'hirepulse-mcp-proxy', version: '1.0.0' });
let server;
let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  await Promise.allSettled([server?.close(), remote.close()]);
}
try {
  await remote.connect(new StreamableHTTPClientTransport(new URL('https://gethirepulse.xyz/mcp')));
  const caps = remote.getServerCapabilities() ?? {};
  server = new Server({ name: 'hirepulse-mcp', version: '1.0.0' }, {
    capabilities: {
      ...(caps.tools ? { tools: {} } : {}),
      ...(caps.resources ? { resources: {} } : {}),
      ...(caps.prompts ? { prompts: {} } : {}),
    },
  });
  if (caps.tools) {
    server.setRequestHandler(ListToolsRequestSchema, r => remote.listTools(r.params));
    server.setRequestHandler(CallToolRequestSchema, r => remote.callTool(r.params));
  }
  if (caps.resources) {
    server.setRequestHandler(ListResourcesRequestSchema, r => remote.listResources(r.params));
    server.setRequestHandler(ReadResourceRequestSchema, r => remote.readResource(r.params));
    server.setRequestHandler(ListResourceTemplatesRequestSchema, r => remote.listResourceTemplates(r.params));
  }
  if (caps.prompts) {
    server.setRequestHandler(ListPromptsRequestSchema, r => remote.listPrompts(r.params));
    server.setRequestHandler(GetPromptRequestSchema, r => remote.getPrompt(r.params));
  }
  server.onclose = close;
  process.once('SIGINT', () => close().finally(() => process.exit(0)));
  process.once('SIGTERM', () => close().finally(() => process.exit(0)));
  await server.connect(new StdioServerTransport());
} catch {
  process.stderr.write('hirepulse-mcp: could not connect to the remote MCP server.\n');
  await close();
  process.exitCode = 1;
}
