const assert = require('node:assert/strict');
const workflow = require('./templates/hirepulse-firecrawl-zero-waste-enrichment.json');
const fixture = require('./data/sample-benchmark-50.json');
const nodes = new Map(workflow.nodes.map(node => [node.name,node]));
for (const [name, branches] of Object.entries(workflow.connections)) {
  assert(nodes.has(name));
  for (const edge of branches.main.flat()) assert(nodes.has(edge.node));
}
const code = name => new Function('$input','$',nodes.get(name).parameters.jsCode);
const input = code('Input and limits')()[0].json;
assert.equal(workflow.active,false);
assert.equal(input.live,false);
assert.deepEqual(input.preview,fixture.rows);
function gate(config, response={}) {
  return code('Clearance check')({first:()=>({json:response})},()=>({first:()=>({json:config})}));
}
const preview = gate({...input,maxScrapes:20});
assert.equal(preview.length,50);
assert.equal(preview.filter(row=>row.json.decision==='would_enrich').length,20);
assert.equal(preview.filter(row=>row.json.decision==='below_threshold').length,30);
assert.equal(preview.filter(row=>row.json.firecrawl_requested).length,0);
const live = {...input,live:true,maxScrapes:1,domains:['first.com','second.com','third.com','fourth.com']};
const rows = [7,0,2].map((count,index)=>({...fixture.rows[index],company_domain:live.domains[index],total_active_jobs:count}));
const gated = gate(live,{statusCode:200,body:rows});
assert.deepEqual(gated.map(row=>row.json.decision),['enrich','below_threshold','scrape_limit','unknown']);
assert(gate(live,{statusCode:429,body:rows}).every(row=>row.json.decision==='unknown'));
assert.equal(gate(live,{statusCode:200,body:[rows[0],rows[0]]})[0].json.decision,'unknown');
assert.equal(code('Audit records')({all:()=>preview})[0].json.enrichment_status,'not_requested');
const normalize = body => code('Enriched company records')({all:()=>[{json:body}]},()=>({itemMatching:()=>gated[0]}))[0].json;
assert.equal(normalize({statusCode:200,body:{success:true,data:{markdown:'# Company'}}}).enrichment_status,'enriched');
assert.equal(normalize({statusCode:503}).enrichment_status,'failed');
console.log('Workflow graph and gate checks passed. Synthetic benchmark: 50 modeled baseline, 20 selected, 60% modeled reduction, 0 live HTTP calls.');
