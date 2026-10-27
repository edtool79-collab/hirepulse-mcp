# HirePulse Super-Tools Playbook

Four manual n8n workflows for company and commerce research. Imported from commit9bff417 and reviewed against the live Gateway. The Gateway hosts these files under `/templates/`.

## Before running
- Review Settings. Defaults use free allowlisted domains:example.com,linear.app,stripe.com,shopify.com,vercel.com. example.com is a labeled synthetic demo; other allowlisted samples may be cached. Do not infer real-company coverage from a synthetic result.
- A trial grants25successful calls shared across supported single-domain data tools for30days. It excludes private lookup, quote redemption and paid email allocation.
- HTTP400/402/429/5xx stop the workflow. No workflow signs a wallet payment, creates a payment client, sends outreach or checks out. A supplied inbox payment authorization is used only after explicitly enabling the inbox step.
- Private lookup and inbox allocation are OFF by default. Trial is not a payment credential. Configure x402 separately to continue after a402; do not blindly retry.
- Templates disable saving successful/failed/manual execution data by default. Never publish trial tokens, inbox access_token/capability, or payment authorizations. Verify your n8n instance retention settings before handling credentials.
- Inputs must be real caller-provided domains. All comparator targets must be allowlisted for a free Sandbox response; adding any real competitor uses normal quota/payment.

##1. zero_waste_outbound_sniper
Template:[n8n-zero-waste-outbound-sniper.json](./n8n-zero-waste-outbound-sniper.json)
Hiring intent($0.01) and Google Ads($0.01) screen EACH candidate. Only selected companies continue to technology($0.005) and public contacts($0.01). All four successful calls for one selected company cost$0.035 before free quota; rejected companies can still incur$0.02 screening cost. There is no measured conversion rate or verified Clay/Apollo saving. A$0.03 company-profile is an alternative when all four sections are needed. Batch/Hot Buyers are separate optional quote flows: scans are free but paid results require redemption, with3scans/IP/UTCday. Hot Buyers requires2–25domains and charges$0.25/hot company on redemption. These quote flows are not silently executed by this template.

##2. agentic_commerce_ucp_acp_kit
Template:[n8n-shopify-ucp-acp-agency-kit.json](./n8n-shopify-ucp-acp-agency-kit.json)
Store readiness($0.01) -> conversion-lead evidence($0.05) -> competitor comparison($0.02). All stages are connected. Set1–3competitor domains. UCP=Universal Commerce Protocol; ACP=Agentic Commerce Protocol. Findings are heuristic, not certification, proof of ad spend amounts or measured lost revenue.

##3. agent_safe_spend_firewall
Template:[n8n-agent-safe-spend-and-otp-pod.json](./n8n-agent-safe-spend-and-otp-pod.json)
x402 endpoint evidence($0.002) -> merchant badge($0.005) -> Markdown($0.002). The policy report never authorizes payment. Optional inbox allocation($0.01 per started600seconds) -> one OTP candidate read is connected behind an explicit enable_inbox setting. Reuse an idempotency_key for allocation retries. Supply your own fresh x402 authorization only when intentionally allocating the inbox. A pending/ambiguous code is not a usable OTP. No polling loop or third-party submission runs. Use your allocation credentials to inspect/delete the inbox if needed; otherwise it expires. Heuristics and Markdown do not guarantee safety or remove every injection.

##4. stealth_vc_and_vendor_xray
Template:[n8n-stealth-vc-and-vendor-xray.json](./n8n-stealth-vc-and-vendor-xray.json)
Optional private tech lookup($0.02) -> footprint($0.03) -> vendor health($0.10) -> jobs($0.01). Direct stages total$0.14 with data; optional single private lookup adds$0.02. The private endpoint also offers$0.04bundles through its documented tier selector, but this template's optional step is the single tech lookup. All direct calls remain direct: enabling one private lookup does not hide later calls. Public signals are not financial forecasts, credit ratings or proof of solvency. Avoid buying redundant checks.

Prices are list prices per useful result before free quota; actual payment requirements are authoritative. These templates were checked structurally and with offline node fixtures; no paid live workflow execution or n8n import was performed during this repair.
