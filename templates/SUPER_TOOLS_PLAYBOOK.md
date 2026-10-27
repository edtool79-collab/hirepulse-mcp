# HirePulse Turnkey Super-Tools Playbook (n8n + MCP + HTTP Recipes)

Instead of calling individual endpoints in isolation, these **4 open-source Super-Tool pipelines** chain HirePulse's 26 canonical MCP tools (`https://gethirepulse.xyz/mcp` and `/v1/...` HTTP routes) into high-ROI workflows.

- **Free Sandbox Domains (Unlimited $0.00 testing):** `linear.app`, `stripe.com`, `shopify.com`, `example.com`
- **Free Daily Quota:** 5 successful data calls per UTC day per IP (shared across tools).
- **Zero-Waste Guarantee:** Empty results (`not_found` / `no_data`) are never charged.
- **Pay-Per-Result (after free tier):** x402 USDC on Base (`eip155:8453`).

---

## 1. The $0.035 Clay Killer — Zero-Waste Outbound Sniper
**Template:** [`n8n-zero-waste-outbound-sniper.json`](./n8n-zero-waste-outbound-sniper.json)

### Why it exists
Traditional outbound waterfalls burn enrichment credits on 80%+ of domains that have frozen hiring and zero active ad spend. This pipeline checks deterministic operational velocity first and enriches contacts **only** when a company is actively expanding.

### Execution Chain & Cost Breakdown
1. **Free Batch / Quote Scan (Optional for 2–50 domains):** `POST /v1/batch` (`batch_lookup`) or `POST /v1/hot-buyers` (`find_hot_buyers`) — Step 1 scan is free (3 scans/day/IP).
2. **Hiring Velocity Gate ($0.01):** `POST /v1/company-intent` (`get_company_hiring_intent`) — Checks live Greenhouse, Lever, Ashby, Workable, Recruitee, and SmartRecruiters boards. ($0 if no board found).
3. **Ad Spend Gate ($0.01):** `POST /v1/google-ads` (`get_google_ads_by_domain`) — Verifies active Google Ads Transparency Center campaigns. ($0 if no ads found).
4. **Tech Stack + Contact Sniper ($0.005 + $0.01):** Runs `POST /v1/tech-stack` (`detect_website_tech_stack`) and `POST /v1/extract-contacts` (`extract_company_contacts`) **only** on companies that pass the gate.

### Try it free right now (Sandbox)
```bash
curl -s -X POST https://gethirepulse.xyz/v1/company-profile \
  -H "Content-Type: application/json" \
  -d '{"domain":"linear.app"}'
```

---

## 2. E-Commerce UCP/ACP Agentic Readiness & Conversion Leak Kit
**Template:** [`n8n-shopify-ucp-acp-agency-kit.json`](./n8n-shopify-ucp-acp-agency-kit.json)

### Why it exists
With Google/Shopify's **Universal Commerce Protocol (UCP)** and OpenAI/Stripe's **Agentic Commerce Protocol (ACP)**, AI shopping agents require `/.well-known/ucp`, `/.well-known/acp/config.json`, complete JSON-LD product offer schemas, and open `robots.txt` policies. Over 75% of stores fail these checks while actively paying for Google Ads.

### Execution Chain & Cost Breakdown
1. **UCP/ACP Store Readiness Audit ($0.01):** `POST /v1/store-readiness` (`muse_agentic_store_readiness_auditor`) — Scores the store (0–100) across UCP/ACP discovery files, JSON-LD product schema, bot access, and payment hints.
2. **Conversion Leak Lead Qualifier ($0.05):** `POST /v1/conversion-leads` (`muse_conversion_leak_lead_finder`) — Combines readiness gaps with verified Google Ads spend and public store contacts.
3. **Competitor Shelf Schema Comparator ($0.02):** `POST /v1/schema-comparator` (`agentic_shelf_schema_comparator`) — Compares structured product schema completeness against up to 3 competitors.

### Try it free right now (Sandbox)
```bash
curl -s -X POST https://gethirepulse.xyz/v1/store-readiness \
  -H "Content-Type: application/json" \
  -d '{"domain":"shopify.com"}'
```

---

## 3. Autonomous Agent Safe-Spend Firewall & Ephemeral OTP Pod
**Template:** [`n8n-agent-safe-spend-and-otp-pod.json`](./n8n-agent-safe-spend-and-otp-pod.json)

### Why it exists
Autonomous AI agents with x402 wallets or shopping tools face indirect prompt injection, unverified 402 endpoints, and signup OTP walls. This firewall screens endpoints before payment and provides sanitized Markdown + ephemeral inbound test inboxes.

### Execution Chain & Cost Breakdown
1. **x402 Endpoint Pre-Payment Check ($0.002):** `POST /v1/verify-merchant` (`x402_merchant_trust_check`) — Checks TLS, x402 discovery files, Coinbase CDP Bazaar reputation, price anomalies, and prompt-injection flags.
2. **Online Merchant Trust & Signed Badge ($0.005):** `POST /v1/merchant-badge` (`verified_merchant_json_badge`) or `POST /v1/merchant-trust` (`pre_purchase_merchant_trust_check`).
3. **Sanitized Web-to-Markdown ($0.002):** `POST /v1/clean-markdown` (`url_to_clean_markdown`) — Strips scripts, ads, and hidden DOM elements.
4. **Authorized Ephemeral OTP Inbox ($0.01 / 10 min):** `POST /v1/email/inboxes` (`create_email_inbox`) + `get_email_code` — Creates a short-lived inbound inbox for authorized automated signup testing.

### Try it free right now (Sandbox)
```bash
curl -s -X POST https://gethirepulse.xyz/v1/verify-merchant \
  -H "Content-Type: application/json" \
  -d '{"target_url":"https://example.com"}'
```

---

## 4. Stealth VC Due Diligence & Instant Vendor Risk X-Ray
**Template:** [`n8n-stealth-vc-and-vendor-xray.json`](./n8n-stealth-vc-and-vendor-xray.json)

### Why it exists
Procurement teams and VC analysts need fast, deterministic operating evidence on vendors and targets without paying $20,000/yr for enterprise TPRM suites or leaking target domains in public x402 facilitator metadata.

### Execution Chain & Cost Breakdown
1. **Blind Proxy Query ($0.02 single / $0.04 bundle):** `POST /v1/private-query` (`private_blind_lookup`) — Strips the target domain from x402 facilitator metadata.
2. **Operating Footprint Verification ($0.03):** `POST /v1/company-footprint` (`company_footprint_check`) — Checks active analytics/ad pixels, live job boards, and Google Ads records.
3. **B2B Vendor Stability Evaluator ($0.10):** `POST /v1/vendor-health` (`b2b_vendor_stability_evaluator`) — Evaluates procurement risk from public technology, DNS/DMARC posture, and hiring evidence.

### Try it free right now (Sandbox)
```bash
curl -s -X POST https://gethirepulse.xyz/v1/company-footprint \
  -H "Content-Type: application/json" \
  -d '{"domain":"stripe.com"}'
```
