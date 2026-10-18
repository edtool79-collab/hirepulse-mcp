# hirepulse-mcp

Connect Claude Desktop, Cursor or Windsurf to [HirePulse](https://gethirepulse.xyz/mcp)
through stdio. Requires Node.js 20 or newer.

```sh
npx -y hirepulse-mcp
```

Paste into Claude Desktop's `claude_desktop_config.json`, Cursor's
`.cursor/mcp.json`, or Windsurf's `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "hirepulse": {
      "command": "npx",
      "args": ["-y", "hirepulse-mcp"]
    }
  }
}
```

On Windows, if the application cannot launch npx, use `"command": "cmd"`
and `"args": ["/c", "npx", "-y", "hirepulse-mcp"]`.

Eight tools: website tech stack, open company jobs, hiring intent, Google Ads
transparency, company profile, company footprint, hot-buyer screening and bulk lookup.
Five successful free calls per UTC day per IP are shared across tools.
Batch and hot-buyer scans have separate limits and a two-step quote flow.
Empty results are not charged. Paid results use x402, USDC on Base:
single lookups start at $0.005; hot buyers cost $0.25 per hot company.

This proxy uses the official MCP SDK. It does not read wallet keys or pay
automatically. After the free allowance, it returns the gateway's x402 challenge.
For automatic payments, connect directly to https://gethirepulse.xyz/mcp
with the official @x402/mcp client.

[API catalog](https://gethirepulse.xyz/v1/catalog) ·
[Examples](https://github.com/edtool79-collab/hirepulse-agent-examples)

Disclosure: I maintain HirePulse. MIT license.
