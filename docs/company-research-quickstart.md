# Research one company with HirePulse

Use the 8-tool B2B profile for company research. Start with a free labeled demo, then use the shared free allowance or an eligible 25-call trial. A combined profile costs $0.03 per qualifying result. Growth signals are estimates from public evidence, not financial forecasts.

## 1. Connect the focused B2B profile

For clients supporting remote Streamable HTTP MCP:

```json
{
  "mcpServers": {
    "hirepulse": {
      "url": "https://gethirepulse.xyz/mcp?profile=b2b&ref=github-b2b-guide"
    }
  }
}
```

This profile exposes 8 tools, including `ask_hirepulse_advisor`, `get_company_profile` and `claim_free_trial`. The npm stdio proxy `npx -y hirepulse-mcp@1.0.0` exposes the full 26-tool gateway. Use remote MCP for the focused profile.

## 2. Try the free demo

Ask your agent:

> Use HirePulse get_company_profile for example.com. Treat the returned sandbox as a demonstration. Summarize technology, hiring, Google Ads and contacts; show missing data, the evidence date and the limits of breakout_summary. Do not authorize a payment.

HTTP equivalent:

```sh
curl -X POST 'https://gethirepulse.xyz/v1/company-profile?ref=github-b2b-guide' \
  -H 'Content-Type: application/json' \
  -d '{"domain":"example.com"}'
```

The response is labeled sandbox data and does not consume the shared free allowance. It is not a live company result. [Recorded labeled demo excerpt](../examples/company-profile-demo.json).

## 3. Research a real company

Replace `example.com` with one public company domain. Ask for a table of signal, observed evidence, collection date, missing data and next verification step. Keep unknown values unknown. A profile combines technology, hiring/open roles, Google Ads and published contacts plus `breakout_summary`; coverage varies by company.

Five successful company/commerce calls per UTC day per IP are shared across data tools. Cloud users sharing an IP can use `claim_free_trial` with an eligible active Base wallet or business email: one 25-call pass valid for 30 days. No email is sent. Keep the returned token private. For MCP, send it in `params._meta["hirepulse/trial_token"]`; for HTTP, use `X-Trial-Token`. Never publish the token.

A qualifying paid profile costs $0.03 USDC on Base when at least two of the four sections contain data. A 402 response is a payment offer, not a completed payment. Payment requires your authorization. Empty or failed lookups are not charged. Private lookup and email allocation have separate terms.

## Choose the right entry point

- `get_company_profile`: one company, combined evidence.
- Signal-only tools: technology, jobs, hiring intent, ads or contacts when that is all you need.
- `batch_lookup` and `company_footprint_check`: use the [full 26-tool endpoint](https://gethirepulse.xyz/mcp?ref=github-b2b-guide); these tools are not in the focused B2B profile.
- [Commerce setup](https://gethirepulse.xyz/?ref=github-b2b-guide#start-commerce): 11 tools for products and merchant evidence.

[Live guided setup](https://gethirepulse.xyz/?ref=github-b2b-guide#start-b2b) · [Investor radar n8n template](https://gethirepulse.xyz/templates/n8n-investor-radar.json) · [Prices and schemas](https://gethirepulse.xyz/v1/catalog) · [Glama B2B listing](https://glama.ai/mcp/connectors/io.github.edtool79-collab/hirepulse-b2b)
