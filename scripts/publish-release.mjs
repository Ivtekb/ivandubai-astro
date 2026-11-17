#!/usr/bin/env node
// Single Codex publishing handoff AFTER the final Owner-approved Markdown is staged.
// GH CLI route: preflight -> branch/PR -> GitHub QA + Vercel preview -> merge -> production QA.
// No copywriting or automatic changes to existing published text. --dry-run never writes.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const args=process.argv.slice(2);
const flag=(key)=>args.includes(key);
const opt=(key)=>{const i=args.indexOf(key);return i<0?null:args[i+1];};
const stop=(msg)=>{console.error('PUBLISH BLOCKED: '+msg);process.exit(1);};
const dry=flag('--dry-run');
if(!flag('--approved-publish'))stop('Explicit --approved-publish required after Owner PUBLISH.');
const route=opt('--route');
const imageArg=opt('--image');
if(!/^\/(?:en\/)?(?:blog|cases)\/[a-z0-9-]+\/$/.test(route||'')||!imageArg)
  stop('Specify --route /en/blog/<slug>/ (or another role route) and --image 28.');
const parts=route.split('/').filter(Boolean);
const en=parts[0]==='en';
const section=parts[en?1:0];
const slug=parts[en?2:1];
const id=(section==='blog'?'blog':'cases');
const source='src/content/'+id+'/'+(en?'en/':'')+slug+'.md';
if(!existsSync(source))stop('Expected final Markdown file not found: '+source);
const content=readFileSync(source,'utf8');
const index=content.indexOf('\n---\n',4);
if(!content.startsWith('---\n')||index<0)stop('Invalid Markdown frontmatter in '+source);
const fm=content.slice(4,index);
const title=fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || slug;
function imagePath(value) {
  if(value.startsWith('/')){
    if(!/^\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp|avif)$/i.test(value))stop('Invalid image path');
    return value;
  }
  if(!/^[0-9]+$/.test(value))stop('Image must be an existing /filename.jpg or number');
  const names=readdirSync('public').filter(n=>
    /^(post|case)-[0-9]+\.(jpg|jpeg|png|webp|avif)$/i.test(n)&&n.match(/^[a-z]+-([0-9]+)\./i)?.[1]===value
  );
  if(names.length!==1)stop('Expected one existing image for #'+value+'; found '+names.length);
  return '/'+names[0];
}
const image=imagePath(imageArg);
if(!existsSync('public'+image))stop('Missing image: public'+image);
const fmImage=fm.match(/\n\s*image:\s*\n\s*src:\s*["']([^"']+)["']/)?.[1];
if(fmImage!==image)stop('seo.image.src must reference '+image);
if(!content.slice(index+5).includes(']('+image+')'))
  stop('Visible Markdown image missing; metadata-only is not sufficient: '+image);
const git=(a,opts={})=>execFileSync('git',a,{encoding:'utf8',stdio:['ignore','pipe','pipe'],...opts}).trim();
const gh=(a,opts={})=>execFileSync('gh',a,{encoding:'utf8',stdio:['ignore','pipe','pipe'],...opts}).trim();
function runGit(a){try{return git(a);}catch(e){stop('Git '+a[0]+': '+String(e.stderr||e.message).slice(0,250));}}
const branch=runGit(['branch','--show-current']);
const root=runGit(['rev-parse','--show-toplevel']);
if(resolve(root)!==process.cwd())stop('Run from repository root '+root);
if(!branch||branch==='main')stop('Use a dedicated clean content branch, never main.');
const remote=runGit(['remote','get-url','origin']);
if(!remote.includes('Ivtekb/ivandubai-astro'))stop('Unexpected Git origin: '+remote);
const dirty=runGit(['status','--porcelain','--untracked-files=all']).split('\n').filter(Boolean);
if(dirty.some(line=>{
  const path=line.slice(3);
  return path!==source && path!=='public'+image;
}))stop('Unrelated worktree changes present; use an isolated publication branch.');
const numeric=/^(?:post|case)-[0-9]+$/.test(slug);
let legacyOption=[];
if(numeric){
  const twin='/' +(en?'': 'en/')+section+'/'+slug+'/';
  legacyOption=['--legacy-counterpart',twin];
}
const validator='scripts/verify-publication-slug.mjs';
if(existsSync(validator)) {
  const p=spawnSync(process.execPath,[validator,'--route',route,...legacyOption],{encoding:'utf8'});
  if(p.status!==0)stop('URL validation failed: '+(p.stderr||p.stdout||'').trim());
}
console.log('PREFLIGHT PASS '+source+' '+image+' role='+(en?'EN':'RU')+' dry_run='+dry);
if(dry)process.exit(0);
// All remote operations can require the Codex environment's network permission.
// If blocked, Codex should use its connected GitHub actions once, not retry DNS.
try{gh(['--version']);}catch{stop('gh CLI unavailable; use connected GitHub actions for PR/release.');}
try{gh(['auth','status']);}catch{stop('gh not authenticated; use connected GitHub actions, no owner reapproval.');}
runGit(['fetch','origin','main']);
const baseline=runGit(['rev-parse','origin/main']);
try{git(['cat-file','-e','origin/main:'+source]);stop('Existing published page would be overwritten: '+source);}
catch(e){if(e?.message?.startsWith('PUBLISH BLOCKED'))throw e;}
runGit(['add','--',source,'public'+image]);
const staged=runGit(['diff','--cached','--name-only']);
if(staged)runGit(['commit','-m','Publish '+(en?'EN ':'RU ')+section+': '+slug]);
const changes=runGit(['diff','--name-status','origin/main...HEAD']).split('\n').filter(Boolean);
const allowed=/^A\s+(src\/content\/(?:blog|cases)\/(?:en\/)?[a-z0-9-]+\.md|public\/[a-zA-Z0-9_.-]+\.(?:jpg|jpeg|png|webp|avif))$/i;
if(!changes.length||changes.some(line=>!allowed.test(line)))
  stop('Content-only scope violated: '+changes.join(' | '));
runGit(['push','-u','origin','HEAD']);
const prBody=['Owner-approved explicit PUBLISH; final text supplied externally; no Codex translation.',
  'Scope: new '+source+'; hero '+image+'; production URL https://www.ivandubai.xyz'+route,
  'Automated Publish Quality Gate and Vercel preview are mandatory.'].join('\n\n');
let prNumber;
try {
  const previous=JSON.parse(gh(['pr','view','--json','number']));
  prNumber=previous.number;
} catch {
  gh(['pr','create','--base','main','--head',branch,
      '--title','Publish '+(en?'EN ':'RU ')+section+': '+title.slice(0,90),
      '--body',prBody]);
  prNumber=JSON.parse(gh(['pr','view','--json','number'])).number;
}
console.log('PR CREATED #'+prNumber+'; waiting for GitHub QA and Vercel preview checks');
const checks=spawnSync('gh',['pr','checks',String(prNumber),'--watch','--fail-fast','--interval','10'],
  {encoding:'utf8',timeout:480000});
if(checks.status!==0)stop('PR checks or preview not PASS. '+String(checks.stderr||checks.stdout).slice(-350));
const sha=runGit(['rev-parse','HEAD']);
let checkRuns;
try { checkRuns=JSON.parse(gh(['api','repos/Ivtekb/ivandubai-astro/commits/'+sha+'/check-runs'])); }
catch(e){stop('Cannot inspect GitHub check runs: '+String(e.message).slice(0,150));}
const qa=checkRuns.check_runs?.find(x=>x.name==='verify_content_pr');
if(!qa||qa.conclusion!=='success')stop('Required verify_content_pr check not successful.');
let status;
try{status=JSON.parse(gh(['api','repos/Ivtekb/ivandubai-astro/commits/'+sha+'/status']));}
catch(e){stop('Cannot inspect preview: '+String(e.message).slice(0,150));}
if(status.state!=='success')stop('Vercel Preview status not SUCCESS.');
runGit(['fetch','origin','main']);
if(runGit(['rev-parse','origin/main'])!==baseline)
  stop('main advanced since build; refresh branch and re-run automatic QA (no merge).');
gh(['pr','merge',String(prNumber),'--merge']);
const merged=JSON.parse(gh(['pr','view',String(prNumber),'--json','state,mergeCommit']));
if(merged.state!=='MERGED'||!merged.mergeCommit?.oid)stop('Cannot confirm PR merged.');
const mergeSha=merged.mergeCommit.oid;
console.log('PR MERGED '+mergeSha+'; waiting for automated production byte-parity verification.');
let runId;
for(let attempt=0;attempt<24;attempt++){
  const runs=JSON.parse(gh(['run','list','--workflow','Publish Quality Gate',
    '--event','push','--commit',mergeSha,'--limit','5','--json','databaseId']));
  if(runs?.[0]?.databaseId){runId=runs[0].databaseId;break;}
  await new Promise(r=>setTimeout(r,5000));
}
if(!runId)stop('Production quality workflow not visible; inspect GitHub Actions.');
const watched=spawnSync('gh',['run','watch',String(runId),'--exit-status'],
  {encoding:'utf8',timeout:780000});
if(watched.status!==0)stop('Production verification failed; review run #'+runId);
try{gh(['issue','comment','16','--body',
  'CONTENT RELEASE ACCEPTED: PR #'+prNumber+' merge '+mergeSha+
  '; production '+route+'; GitHub Actions output-parity PASS.']);}
catch{console.log('Release succeeded; register comment needs later synchronization.');}
console.log('PUBLISHED https://www.ivandubai.xyz'+route+
  '\nIMAGE '+image+'; PR #'+prNumber+'; production PASS; no editorial changes.');
