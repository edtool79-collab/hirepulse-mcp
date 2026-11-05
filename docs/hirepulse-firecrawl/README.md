# HirePulse pre-filter + Firecrawl deep scrape

**v1.0.0 review candidate** · n8n workflow JSON · Firecrawl API v2 · MIT

Screen a list of company domains for active public job postings. Enrich the homepages of companies that meet the hiring threshold with Markdown and structured public company facts. Use the audit output to review companies below the threshold, unknown results, and companies skipped because of the request limit.

```text
Manual trigger → Domains and limits → ATS Job Pulse → Clearance check
                                                           |
                            Eligible within limit ─────────┼──→ Firecrawl → Enriched company records
                            Other decisions ──────────────┴──→ Audit records
```

## Quickstart

1. Import `templates/hirepulse-firecrawl-zero-waste-enrichment.json` into n8n. Run it manually with the supplied `live:false` configuration. The preview produces 50 audit records and performs zero HTTP requests.
2. For a live test, create two separate n8n **Header Auth** credentials. For ATS Job Pulse, set the header name to `Authorization` and the value to `Bearer YOUR_APIFY_TOKEN`. For Firecrawl, use `Authorization` and `Bearer YOUR_FIRECRAWL_API_KEY`. Bind each credential only to its corresponding HTTP node.
3. Edit **Input and limits**. Set your bare company domains, `minimumJobs`, `maxScrapes`, and `apifyEventCapUsd`, then explicitly set `live:true`. Start with one domain and at most one scrape. Review the plans and expected charges before executing.
4. Inspect **Enriched company records** and **Audit records**. They share a JSON structure. Attach a CRM or sheet export to the branches you need. The workflow has a manual trigger and starts inactive.

## Interpretation and limits

ATS Job Pulse reads supported public ATS boards. The gate uses `total_active_jobs` from a `company_summary`; the job rows themselves may be truncated. A missing or ambiguous summary is `unknown`, while an observed count below the threshold is `below_threshold`. A positive count measures advertised openings rather than growth over time. The v1 gate has no independent DNS, advertising, or Workday check.

Firecrawl gets one homepage request for each selected domain and returns Markdown plus optional JSON fields for value proposition, technology mentions, and public leadership mentions. Treat extracted fields as candidates for review and use the source URL to verify them. This version does not crawl subpages. HTTP failures produce a failed enrichment record. After an Apify timeout, check the run history before restarting to avoid a duplicate charge.

`maxScrapes` limits requests per execution. Firecrawl credits depend on formats and options, so the request cap is not a dollar cap. The Apify cap is passed independently to the Actor. Review current [ATS Job Pulse pricing](https://apify.com/hirepulse/ats-job-pulse/pricing) and [Firecrawl pricing](https://www.firecrawl.dev/pricing).

## Benchmark

`data/sample-benchmark-50.json` is a **synthetic** dataset with 20 positive and 30 zero-count inputs. Run `node build-firecrawl-template.cjs` and `node verify-firecrawl-template.cjs` from the repository root. With `minimumJobs=1` and `maxScrapes=20`, the gate selects 20 of 50, so the modeled one-homepage baseline is 50 requests and the modeled gated count is 20, a **60% reduction in planned requests for this fixture**. The preview makes zero requests. These numbers do not estimate actual credits, expenses, or selection accuracy on real companies.

`data/benchmark-live-candidates.json` proposes 50 domains for review. Freeze the domain sample before collecting results. Record the input domains, query time, threshold, request limit, Actor build, raw job summaries, decisions, attempted and successful Firecrawl calls, credits and charges from both providers, and known hiring signals the filter missed. Treat unknowns separately and report any savings due to the cap separately from those due to screening. Compare matching scrape formats and settings across both scenarios. Keep a real baseline run optional and label modeled baseline cost as modeled.

## Firecrawl review

Review the homepage extraction fields and report whether a public firmographic provider from Alexandria would improve the output. The template includes a note for that extension. Choose the provider and verify its API contract, account access, and credit use before adding it to the execution path. After a shared smoke test and agreement on attribution, the workflow can be considered for the n8n template library.

[Firecrawl scrape API](https://docs.firecrawl.dev/api-reference/endpoint/scrape) · [Alexandria](https://docs.firecrawl.dev/features/alexandria) · [Apify synchronous run API](https://docs.apify.com/api/v2/actor-run-sync-get-dataset-items-post) · [n8n HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
