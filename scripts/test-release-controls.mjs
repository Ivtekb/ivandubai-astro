#!/usr/bin/env node
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { DEFAULT_PRODUCTION_VERIFY_TIMEOUT_MS, guardedMergeArgs, productionVerifyTimeout } from './release-control.mjs';

const root=resolve(new URL('..',import.meta.url).pathname);
const validator=join(root,'scripts/verify-content-release.mjs');
const sha='a'.repeat(40);
assert.deepEqual(guardedMergeArgs('50',sha,sha,sha),[
  'pr','merge','50','--match-head-commit',sha,'--merge'
]);
assert.throws(()=>guardedMergeArgs('50',sha,sha,'b'.repeat(40)),/changed after verification/,
  'remote HEAD change between QA and merge must reject');
assert.throws(()=>guardedMergeArgs('50',sha,'b'.repeat(40),sha),/changed after verification/,
  'local HEAD change between QA and merge must reject');
assert.equal(DEFAULT_PRODUCTION_VERIFY_TIMEOUT_MS,480000);
assert.equal(productionVerifyTimeout(undefined),480000);
assert.equal(productionVerifyTimeout('12345'),12345,'explicit production timeout override must be retained');

const tmp=mkdtempSync(join(tmpdir(),'release-gate-'));
const write=(p,s)=>{mkdirSync(dirname(p),{recursive:true});writeFileSync(p,s);};
const git=(args,cwd)=>execFileSync('git',args,{cwd,stdio:'ignore'});
function baseRepo() {
  const repo=join(tmp,'repo');mkdirSync(repo);
  git(['init','-q'],repo);git(['config','user.email','test@example.invalid'],repo);
  git(['config','user.name','Fixture'],repo);
  write(join(repo,'site/index.html'),'<html>baseline</html>');
  write(join(repo,'src/content/blog/already-published.md'),'---\ntitle: approved\n---\n');
  git(['add','.'],repo);git(['commit','-qm','baseline'],repo);
  return {repo,base:execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim()};
}
function runGate(repo,base,baseDir,candidateDir) {
  return execFileSync(process.execPath,[validator,'--base-sha',base,'--base-dir',baseDir,'--current-dir',candidateDir],
    {cwd:repo,encoding:'utf8',stdio:['ignore','pipe','pipe']});
}
function expectFailure(fn,pattern) {
  let error;try{fn();}catch(e){error=e;}
  assert.ok(error,'expected the release gate to fail');
  assert.match(String(error.stderr||error),pattern);
}
function mkBuild(target,article=false) {
  const files={'index.html':article?'': '<html>baseline</html>'};
  if(article){
    files['blog/dubai-branded-residences/index.html']=`<html lang="ru"><head><title>Branded residences in Dubai</title><meta name="description" content="Dubai branded residences and their key features."><link rel="canonical" href="https://www.ivandubai.xyz/blog/dubai-branded-residences/"><meta property="og:image" content="/hero.jpg"><script type="application/ld+json">{"@graph":[{"@type":"Article","url":"https://www.ivandubai.xyz/blog/dubai-branded-residences/","datePublished":"2026-11-17","image":"https://www.ivandubai.xyz/hero.jpg","author":{"@id":"https://www.ivandubai.xyz/#person"}},{"@type":"Person"}]}</script></head><body><article><h1>Dubai branded residences</h1><img src="/hero.jpg" alt="Dubai residences"><p>Article</p></article></body></html>`;
    files['sitemap-0.xml']='https://www.ivandubai.xyz/blog/dubai-branded-residences/';
    files['rss.xml']='https://www.ivandubai.xyz/blog/dubai-branded-residences/';
    files['hero.jpg']='fixture';
  }
  for(const [name,content] of Object.entries(files))write(join(target,name),content);
}
try {
  const {repo,base}=baseRepo();
  const baseDir=join(tmp,'base'),technicalDir=join(tmp,'technical');
  mkBuild(baseDir);mkBuild(technicalDir);write(join(technicalDir,'index.html'),'<html>technical output</html>');
  write(join(repo,'scripts/example.mjs'),'export const technical = true;\n');
  git(['add','.'],repo);git(['commit','-qm','technical PR'],repo);
  const technical=runGate(repo,base,baseDir,technicalDir);
  assert.match(technical,/QA PASS/);assert.match(technical,/TECHNICAL PR — Claude review required/);
  assert.match(technical,/SOURCE A\tscripts\/example\.mjs/);assert.match(technical,/OUTPUT index\.html/);
  write(join(repo,'src/content/blog/already-published.md'),'---\ntitle: unauthorized change\n---\n');
  git(['add','--','src/content/blog/already-published.md'],repo);git(['commit','-qm','change published content'],repo);
  expectFailure(()=>runGate(repo,base,baseDir,technicalDir),/Previously published content changed/);

  const contentRepo=join(tmp,'content-repo');mkdirSync(contentRepo);git(['init','-q'],contentRepo);
  git(['config','user.email','test@example.invalid'],contentRepo);git(['config','user.name','Fixture'],contentRepo);
  write(join(contentRepo,'site/index.html'),'<html>baseline</html>');
  write(join(contentRepo,'src/content/blog/already-published.md'),'---\ntitle: approved\n---\n');
  git(['add','.'],contentRepo);git(['commit','-qm','baseline'],contentRepo);
  const contentBase=execFileSync('git',['rev-parse','HEAD'],{cwd:contentRepo,encoding:'utf8'}).trim();
  const contentDir=join(tmp,'content-output');mkBuild(contentDir,true);
  write(join(contentRepo,'src/content/blog/dubai-branded-residences.md'),`---\ntitle: Dubai branded residences\npublishDate: 2026-11-17\nimage:\n  src: '/hero.jpg'\n  alt: 'Dubai residences'\n---\n\n![Dubai residences](/hero.jpg)\n`);
  write(join(contentRepo,'public/hero.jpg'),'fixture');
  git(['add','.'],contentRepo);git(['commit','-qm','new article'],contentRepo);
  const positive=runGate(contentRepo,contentBase,baseDir,contentDir);
  assert.match(positive,/QA PASS/);assert.match(positive,/new_pages=1/);
  assert.match(positive,/OUTPUT_DIFF_BEGIN/);

  write(join(contentRepo,'src/content/blog/already-published.md'),'---\ntitle: changed\n---\n');
  git(['add','.'],contentRepo);git(['commit','-qm','mutate published content'],contentRepo);
  expectFailure(()=>runGate(contentRepo,contentBase,baseDir,contentDir),/Previously published content changed/);

  const badRepo=join(tmp,'bad-content-repo');mkdirSync(badRepo);git(['init','-q'],badRepo);
  git(['config','user.email','test@example.invalid'],badRepo);git(['config','user.name','Fixture'],badRepo);
  write(join(badRepo,'site/index.html'),'<html>baseline</html>');git(['add','.'],badRepo);git(['commit','-qm','baseline'],badRepo);
  const badBase=execFileSync('git',['rev-parse','HEAD'],{cwd:badRepo,encoding:'utf8'}).trim();
  write(join(badRepo,'src/content/blog/dubai-branded-residences.md'),'---\ntitle: test\n---\n');
  write(join(badRepo,'scripts/unrelated.mjs'),'export {};');git(['add','.'],badRepo);git(['commit','-qm','mixed scope'],badRepo);
  expectFailure(()=>runGate(badRepo,badBase,baseDir,contentDir),/unrelated source changes/);

  const parityDir=join(tmp,'parity');mkdirSync(join(parityDir,'dist'),{recursive:true});
  write(join(parityDir,'dist/index.html'),'production-ready');
  const preload=join(parityDir,'mock-vercel.mjs');
  write(preload,`let count=0;\nconst realTimeout=globalThis.setTimeout;\nglobalThis.fetch=async()=>new Response(++count===1?'building':'production-ready',{status:200});\nglobalThis.setTimeout=(fn)=>realTimeout(fn,0);\n`);
  const waiting=execFileSync(process.execPath,['--import',preload,join(root,'scripts/verify-live-parity.mjs')],{
    cwd:parityDir,encoding:'utf8',env:{...process.env,PRODUCTION_VERIFY_TIMEOUT_MS:'480000'}
  });
  assert.match(waiting,/Waiting for exact Vercel deployment: 1 files not yet identical/);
  assert.match(waiting,/PRODUCTION PASS 1\/1 files byte-identical; attempts=2/);
  console.log('RELEASE CONTROL TESTS PASS: technical + content positive/negative; SHA race guard; exact merge args.');
} finally { rmSync(tmp,{recursive:true,force:true}); }
