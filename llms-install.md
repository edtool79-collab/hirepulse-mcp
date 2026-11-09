# Installing the HirePulse MCP server

HirePulse is a hosted (remote) MCP server. There is nothing to install locally, and you don't need an API key to start.

## Cline

Add this entry to `cline_mcp_settings.json` (Cline → MCP Servers → Configure MCP Servers):

```json
{
  "mcpServers": {
    "hirepulse": {
      "type": "streamableHttp",
      "url": "https://gethirepulse.xyz/mcp?profile=b2b&ref=cline",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Keep `"type": "streamableHttp"`. The server speaks Streamable HTTP only, and Cline falls back to the legacy SSE transport when `type` is missing, which this server does not support.

Where the settings file is:

- Cline 4: `~/.cline/data/settings/cline_mcp_settings.json`. On Windows that is `%USERPROFILE%\.cline\data\settings\cline_mcp_settings.json`.
- Older Cline versions: `<VS Code user data>/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

Edit the file directly. Cline reloads it automatically, so the hirepulse tools appear within seconds and no restart is needed.

You can also add it from the Remote Servers tab. Use the same URL and choose the Streamable HTTP transport.

## Check that it works

- The server lists 10 tools, including `get_company_profile`, `detect_website_tech_stack`, `get_company_open_jobs` and `get_google_ads_by_domain`.
- Call `detect_website_tech_stack` with `{"domain": "example.com"}`. `example.com` is a free demo domain, so this call costs nothing and returns a full answer.

## Cost

- Free: demo domains, and a 25-call trial you can claim with the `claim_free_trial` tool.
- After that, each qualifying result is paid per call, and empty results are free. Each paid tool's description states its price. Most tools cost $0.005 to $0.03 per result.
