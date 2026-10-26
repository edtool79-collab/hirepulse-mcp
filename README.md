# hirepulse-mcp

An stdio MCP server that proxies the remote HirePulse MCP gateway (`https://gethirepulse.xyz/mcp`).

## Usage

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

Paste into Claude Desktop's `claude_desktop_config.json` or your MCP client configuration.

On Windows, if the application cannot launch npx, use `"command": "cmd"`
and `"args": ["/c", "npx", "-y", "hirepulse-mcp"]`.

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
