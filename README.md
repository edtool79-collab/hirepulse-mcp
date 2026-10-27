# HirePulse company research MCP

Research a company from public technology, open jobs and hiring signals, Google Ads and published contacts. A combined profile costs $0.03 per qualifying result and includes `breakout_summary` growth estimates. Start with a labeled free sandbox, then use a 25-call trial for real research. Growth signals are not financial forecasts.

[Start here: research one company in three steps](docs/company-research-quickstart.md) — connect the 8-tool B2B profile, try a labeled free demo, then research a real domain.

## Start with remote MCP: 8 focused B2B tools

No npm package is needed for clients that support remote HTTP MCP:

```json
{
  "mcpServers": {
    "hirepulse": {
      "url": "https://gethirepulse.xyz/mcp?profile=b2b&ref=github"
    }
  }
}
```

Claude Code:

```sh
claude mcp add --transport http hirepulse 'https://gethirepulse.xyz/mcp?profile=b2b&ref=github'
```

Clients requiring stdio can bridge the remote endpoint:

```json
{
  "mcpServers": {
    "hirepulse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://gethirepulse.xyz/mcp?profile=b2b&ref=github"]
    }
  }
}
```

## npm: local stdio proxy

[`hirepulse-mcp@1.0.0`](https://www.npmjs.com/package/hirepulse-mcp) is published and verified against all 26 live tools, including `claim_free_trial`. Requires Node.js 20+.

```json
{
  "mcpServers": {
    "hirepulse": {
      "command": "npx",
      "args": ["-y", "hirepulse-mcp@1.0.0"]
    }
  }
}
```

The npm proxy exposes the full 26-tool gateway. For a focused 8-tool or 11-tool setup, use the remote profiles above. Source development: `npm ci`, `npm run build`, `npm test`.

## Try a company profile without a wallet

```sh
curl -X POST 'https://gethirepulse.xyz/v1/company-profile?ref=github' \
  -H 'Content-Type: application/json' \
  -d '{"domain":"example.com"}'
```

`example.com` returns explicitly labeled synthetic sandbox data, not a live company result, and does not consume the shared free allowance.

For real company lookups, `claim_free_trial` / `POST /v1/trial` grants an eligible business email or active Base wallet a one-time 25-call pass valid for 30 days. No email is sent. Keep the returned token private; send it using `X-Trial-Token` or MCP `params._meta["hirepulse/trial_token"]`. Private lookup and paid inbox allocation are excluded.

[Guided setup and demo](https://gethirepulse.xyz/?ref=github#start-b2b) · [Investor radar n8n workflow](https://gethirepulse.xyz/templates/n8n-investor-radar.json) · [API catalog](https://gethirepulse.xyz/v1/catalog)

## Commerce and the complete catalog

- Commerce research: `https://gethirepulse.xyz/mcp?profile=commerce&ref=github` (11 tools).
- Complete v12 catalog: `https://gethirepulse.xyz/mcp?ref=github` (26 tools; existing clients remain supported).
- Versioned machine-readable configurations: [B2B](mcp-b2b.json), [Commerce](mcp-commerce.json), and [complete catalog](mcp.json).

## Proxy behavior and pricing

The proxy forwards the live gateway catalog: 26 canonical MCP tools in version 12
(verified 26 October 2026). The legacy names `00_ask_hirepulse_advisor` and
`verify_domain_legitimacy_and_security` remain callable for compatibility but
are omitted from `tools/list`. Schemas are forwarded from the gateway rather
than maintained in a second copy. Every input parameter has a description.
Tools cover website technology,
public job boards, hiring signals, Google Ads transparency, company profiles,
contacts, web-to-Markdown, merchant screening and commerce evidence.
Five successful free calls per UTC day per IP are shared across tools.
Batch and hot-buyer scans have separate limits and a two-step quote flow.
Empty results are not charged. Paid results use x402, USDC on Base:
see the live catalog for each price; hot buyers cost $0.25 per hot company.

Use `pre_purchase_merchant_trust_check` for an online shop before buying goods.
Use `x402_merchant_trust_check` instead for an x402 API before signing a crypto
payment. Neither scan certifies safety or authorizes spending. For
`private_blind_lookup`, `arguments` contains only `tool` and `target`; select the
bundle tier in MCP request metadata `params._meta["hirepulse/private-tier"]`,
outside `arguments`, or with the HTTP `X-Private-Query-Tier: bundle` header.

## Requirements

- Node.js 20 or newer
- Network access to `https://gethirepulse.xyz`

## Direct Gateway (Remote MCP)

If your client supports remote HTTP MCP directly, you can connect to
`https://gethirepulse.xyz/mcp` without this package. Use this stdio proxy
when your client (such as Claude Desktop) only supports local stdio MCP servers.

## Free Sandbox Domains

Calls targeting `linear.app`, `stripe.com`, `shopify.com`, and `example.com`
are free on the remote gateway so you can test tool calling end-to-end
without an x402 wallet.

## License

MIT
