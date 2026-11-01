# HirePulse company research MCP

Company enrichment and hiring signals from a domain, plus web page to clean Markdown. Research public technology, open jobs, Google Ads and published contacts. A combined profile costs $0.03 per qualifying result and includes `breakout_summary` growth estimates. Start with a labeled free sandbox, then use a 25-call trial for real research. Growth signals are not financial forecasts. Includes open-source **n8n Turnkey Super-Tool Workflows** (`templates/`).

[Start here: research one company in three steps](docs/company-research-quickstart.md) — connect the 9-tool B2B profile, try a labeled free demo, then research a real domain.

## Claude Code plugin

Add HirePulse to Claude Code from this repository:

```
/plugin marketplace add edtool79-collab/hirepulse-mcp
/plugin install hirepulse-company-research@hirepulse
```

The plugin connects the 9-tool B2B profile (`https://gethirepulse.xyz/mcp?profile=b2b`) and adds a company-research skill.

## Start with remote MCP: 9 focused B2B tools

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

[`hirepulse-mcp`](https://www.npmjs.com/package/hirepulse-mcp) forwards the current 27-tool gateway, including `watch_company_jobs` and `claim_free_trial`. Requires Node.js 20+. Tool inventory comes from the live server; it is not bundled in the package.

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

The npm proxy exposes the full 27-tool gateway. For a focused 9-tool or 11-tool setup, use the remote profiles above. Source development: `npm ci`, `npm run build`, `npm test`.

## Try a company profile without a wallet

```sh
curl -X POST 'https://gethirepulse.xyz/v1/company-profile?ref=github' \
  -H 'Content-Type: application/json' \
  -d '{"domain":"example.com"}'
```

`example.com` returns explicitly labeled synthetic sandbox data, not a live company result, and does not consume the shared free allowance.

For real company lookups, `claim_free_trial` / `POST /v1/trial` grants an eligible business email or active Base wallet a one-time 25-call pass valid for 30 days. No email is sent. Keep the returned token private; send it using `X-Trial-Token` or MCP `params._meta["hirepulse/trial_token"]`. The25calls are shared across supported single-domain data tools; they are not locked to one tool. Private lookup, quote redemption and paid inbox allocation are excluded.

[Guided setup and demo](https://gethirepulse.xyz/?ref=github#start-b2b) · [Investor radar n8n workflow](https://gethirepulse.xyz/templates/n8n-investor-radar.json) · [API catalog](https://gethirepulse.xyz/v1/catalog)

## Commerce and the complete catalog

- Commerce research: `https://gethirepulse.xyz/mcp?profile=commerce&ref=github` (11 tools).
- Full live catalog: `https://gethirepulse.xyz/mcp?ref=github` (27 tools; existing clients remain supported).
- Versioned machine-readable configurations: [B2B](mcp-b2b.json), [Commerce](mcp-commerce.json), and [complete catalog](mcp.json).

## Proxy behavior and pricing

The proxy forwards the live gateway catalog: 27 MCP tools (measured on 1 November 2026 against [the live MCP endpoint](https://gethirepulse.xyz/mcp)); the focused B2B and commerce profiles expose 9 and 11 tools respectively. The [HTTP catalog](https://gethirepulse.xyz/v1/catalog) has 22 offers plus the email service. The legacy names `00_ask_hirepulse_advisor` and
`verify_domain_legitimacy_and_security` remain callable for compatibility but
are omitted from `tools/list`. Schemas are forwarded from the gateway rather
than maintained in a second copy. Every input parameter has a description.
Tools cover website technology,
public job boards, hiring signals, Google Ads transparency, company profiles,
contacts, web-to-Markdown, merchant screening and commerce evidence.
Free daily calls follow the [current published policy](https://gethirepulse.xyz/llms.txt). Measured on 1 November 2026: 10 successful free calls per day per agent, identified by `Mcp-Session-Id`, `X-MCP-Client-Id`, `X-Client-Id` or `X-Agent-Id`, and by IP otherwise; never more than 100 per network. These limits may change; check the live policy before relying on them. Since 1 November 2026, free calls over plain HTTP are opt-in: an unpaid HTTP call with the header `X-HirePulse-Free: 1` uses one, and without it the call gets the x402 payment terms (HTTP 402). MCP tool calls and the sandbox domains use free calls automatically.
Batch and hot-buyer scans have separate limits and a two-step quote flow.
Results whose status is not `ok` are free. Paid results use x402 v2, USDC on Base (`eip155:8453`). See the [live catalog](https://gethirepulse.xyz/v1/catalog) for per-tool prices, starting at $0.002 per result; no call exceeds $1. Quotes and multi-result flows have their own pricing.

Use `pre_purchase_merchant_trust_check` for an online shop before buying goods.
Use `x402_merchant_trust_check` instead for an x402 API before signing a crypto
payment. Neither scan certifies safety or authorizes spending. For
`private_blind_lookup`, `arguments` contains only `tool` and `target`; select the
bundle tier in MCP request metadata `params._meta["hirepulse/private-tier"]`,
outside `arguments`, or with the HTTP `X-Private-Query-Tier: bundle` header.

## Open-Source n8n Super-Tool Workflows (`templates/`)

Manual n8n workflows with free Sandbox defaults, connected processing stages and explicit HTTP error stops. Optional private lookups and paid inbox allocation are disabled by default. No workflow signs a wallet transaction or authorizes checkout. Reviewed structurally and with offline node fixtures; not imported into a live n8n instance during this repair (see [`templates/SUPER_TOOLS_PLAYBOOK.md`](./templates/SUPER_TOOLS_PLAYBOOK.md) for full documentation and `curl` recipes):

1. **[Zero-Waste Outbound Sniper](./templates/n8n-zero-waste-outbound-sniper.json)**: Filters domains by live ATS hiring velocity (`/v1/company-intent`) and Google Ads (`/v1/google-ads`) **before** running tech-stack (`/v1/tech-stack`) and contact/MX extraction (`/v1/extract-contacts`). Screening costs up to$0.02per candidate and enrichment up to$0.015per selected company before free quota; discarded companies can still incur screening cost.
2. **[E-Commerce UCP/ACP Agentic Readiness & Conversion Leak Kit](./templates/n8n-shopify-ucp-acp-agency-kit.json)**: Audits online stores for Google/Shopify UCP (`/.well-known/ucp`), OpenAI/Stripe ACP (`/.well-known/acp/config.json`), and JSON-LD schema gaps (`/v1/store-readiness`), cross-referenced with ad and public-contact evidence (`/v1/conversion-leads`), followed by competitor comparison (`/v1/schema-comparator`). No certification or measured conversion loss is implied.
3. **[Autonomous Agent Safe-Spend Firewall & Ephemeral OTP Pod](./templates/n8n-agent-safe-spend-and-otp-pod.json)**: Screens x402 endpoints (`/v1/verify-merchant`) and online merchants (`/v1/merchant-badge`) for prompt-injection flags and trust signals, then reads bounded Markdown. Optional paid inbox allocation and one OTP candidate read require explicit setup. Heuristic evidence does not authorize payment or guarantee safety.
4. **[Stealth VC Due Diligence & Instant Vendor Risk X-Ray](./templates/n8n-stealth-vc-and-vendor-xray.json)**: Combines operating footprint (`/v1/company-footprint`), vendor assessment (`/v1/vendor-health`) and jobs (`/v1/ats-jobs`). An optional private lookup is disabled by default; later direct calls remain direct. Public signals are not financial forecasts.
5. **[Stealth Breakout & Investor Radar](./templates/n8n-investor-radar.json)**: Screens domain shortlists via `/v1/company-profile` for strong/moderate breakout signals.

## Requirements

- Node.js 20 or newer
- Network access to `https://gethirepulse.xyz`

## Direct Gateway (Remote MCP)

If your client supports remote HTTP MCP directly, you can connect to
`https://gethirepulse.xyz/mcp` without this package. Use this stdio proxy
when your client (such as Claude Desktop) only supports local stdio MCP servers.

## Free Sandbox Domains

Calls targeting `example.com`, `linear.app`, `stripe.com`, `shopify.com`, and `vercel.com` are free on supported single-tool routes, including URL and vendor-domain inputs. Every comparator domain must also be allowlisted. `example.com` is a labeled synthetic preview; other allowlisted samples may be cached. These calls do not consume the shared daily free allowance. Private lookup, quote redemption and paid email allocation are excluded. Quote-only and reserved probe requests still return payment terms.

## License

MIT
