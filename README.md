# hirepulse-mcp

An MCP server for company data, for Claude Desktop, Cursor, Windsurf and any MCP client. It has eight tools:

- `detect_website_tech_stack`: tech stack lookup (ad pixels, analytics, CMS, e-commerce, hosting, email, DMARC)
- `get_company_open_jobs`: company jobs API (live open jobs from Greenhouse, Lever, Ashby, Workable, Recruitee, SmartRecruiters)
- `get_company_hiring_intent`: hiring signals and a buying-intent score
- `get_google_ads_by_domain`: Google Ads transparency (is the company advertising, and what)
- `get_company_profile`: all three in one call
- `company_footprint_check`: found / not found public signals, for due diligence
- `find_hot_buyers`: which companies in a list are hiring hardest
- `batch_lookup`: one tool on many domains with one payment

The first 5 calls each day are free, with no account and no API key. After that, each call costs $0.005 to $0.03 (`find_hot_buyers` is $0.25 per hot company), paid in USDC on Base with [x402](https://x402.org). No call ever costs more than $1. Lookups that find nothing are never charged.

## Setup

Claude Desktop (`claude_desktop_config.json`), Cursor (`.cursor/mcp.json`) and Windsurf all use the same block:

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

That gives you the free daily calls. To let the server pay after that, add a wallet. Use a separate wallet that holds only a few dollars of USDC on Base, never your main one:

```json
{
  "mcpServers": {
    "hirepulse": {
      "command": "npx",
      "args": ["-y", "hirepulse-mcp"],
      "env": {
        "BUYER_PRIVATE_KEY": "0x...",
        "HIREPULSE_MAX_PRICE_USD": "0.10"
      }
    }
  }
}
```

`HIREPULSE_MAX_PRICE_USD` is the most it will pay for one call. The default is $0.10. Raise it to $1 to allow `find_hot_buyers`.

Clients that support remote MCP servers can connect directly to `https://api.gethirepulse.xyz/mcp` instead.

## Links

- [API and docs](https://api.gethirepulse.xyz/?ref=npm-readme)
- [llms.txt](https://api.gethirepulse.xyz/llms.txt)
- [Open-source lead agent example](https://github.com/edtool79-collab/hirepulse-lead-agent)

MIT license.
