#!/usr/bin/env node
// Deterministic quality gate: compare built main and PR and check new article HTML.
// Read-only. No network access, browser, or credentials required.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, sep, join } from 'node:path';

const args = process.argv.slice(2);
const arg = (name) => { const i=args.indexOf(name); return i<0?null:args[i+1]; };
const baseSha=arg('--base-sha');
const baseDir=resolve(arg('--base-dir')||'');
const currentDir=resolve(arg('--current-dir')||'dist');
if (!/^[a-f0-9]{40}$/.test(baseSha||'')||!existsSync(baseDir)||!existsSync(currentDir)) {
  console.error('QA FAIL: requires --base-sha SHA --base-dir path --current-dir path'); process.exit(2);
}
const issues=[];
const err=(msg)=>issues.push(msg);
const read=(p)=>readFileSync(p,'utf8');
function files(root) {
  const result=new Map();
  function visit(dir) {
    for (const e of readdirSync(dir,{withFileTypes:true})) {
      const full=join(dir,e.name);
      if (e.isDirectory()) visit(full);
      else if (e.isFile()) result.set(relative(root,full).split(sep).join('/'),full);
    }
  }
  visit(root); return result;
}
function attr(tag,key) {
  const r=new RegExp('\\s'+key+'\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27)','i');
  const m=tag.match(r);return m?(m[1]??m[2]):null;
}
function tag(html,name,key,value) {
  return [...html.matchAll(new RegExp('<'+name+'\\b[^>]*>','gi'))]
    .map(x=>x[0]).find(x=>attr(x,key)===value);
}
function checkPage(file) {
  const m=file.match(/^src\/content\/(blog|cases)\/(en\/)?([a-z0-9-]+)\.mdx?$/);
  if(!m){err('Unsupported content file: '+file);return null;}
  const sec=m[1],locale=m[2]?'en':'ru',slug=m[3];
  const route=(locale==='en'?'en/':'')+sec+'/'+slug+'/';
  const legacy=/^(?:post|case)-[0-9]+$/.test(slug);
  if(legacy) {
    const counterpart='src/content/'+sec+'/'+(locale==='en'?'':'en/')+slug+'.md';
    try {execFileSync('git',['cat-file','-e',baseSha+':'+counterpart],{stdio:'ignore'});}
    catch {err('Numbered URL allowed ONLY for translation of a published legacy counterpart: '+route);}
  } else if(slug.length<8||slug.length>70||!slug.includes('-')||/--|^-|-$/.test(slug)||/^(?:new|blog|article|post|case)-/.test(slug)) {
    err('New original content requires a short descriptive SEO URL, not an arbitrary file ID: '+route);
  }
  const built=join(currentDir,route,'index.html');
  if(!existsSync(built)){err('Missing built route: '+route);return null;}
  const source=read(file),html=read(built);
  if(/<\s*script\b|\bonerror\s*=|\bonload\s*=|javascript:/i.test(source))
    err('New Markdown contains unsafe active HTML/URL: '+file);
  const front=source.startsWith('---\n')?source.slice(4,source.indexOf('\n---\n',4)): '';
  const image=front.match(/\n\s*image:\s*\n\s*src:\s*["']([^"']+)["']/)?.[1];
  if(!image||!/^\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp|avif)$/i.test(image)){
    err('Missing or unsafe SEO image: '+file);return {file,route};
  }
  const imgFile=resolve(currentDir,image.slice(1));
  if(!imgFile.startsWith(currentDir+sep)||!existsSync(imgFile)||statSync(imgFile).size===0)
    err('Missing rendered image asset: '+image);
  const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
  if(!article){err('No visible article body: '+route);return {file,route};}
  const bodyImages=[...article.matchAll(/<img\b[^>]*>/gi)].map(x=>x[0])
    .filter(x=>attr(x,'src')===image);
  if(bodyImages.length!==1||!(attr(bodyImages[0]||'','alt')||'').trim())
    err('Visible image missing or alt empty: '+route);
  const og=tag(html,'meta','property','og:image');
  if(!og||new URL(attr(og,'content')||'', 'https://www.ivandubai.xyz').pathname!==image)
    err('OG image inconsistent: '+route);
  if([...html.matchAll(/<h1(?:\s|>)/gi)].length!==1)err('H1 count invalid: '+route);
  if(html.match(/<html\b[^>]*\blang="([^"]+)"/)?.[1]!==locale)err('Language invalid: '+route);
  const expectedUrl='https://www.ivandubai.xyz/'+route;
  if(attr(tag(html,'link','rel','canonical')||'','href')!==expectedUrl)
    err('Canonical incorrect: '+route);
  const desc=attr(tag(html,'meta','name','description')||'','content');
  if(!desc||desc.length>150)err('Missing or long SEO description: '+route);
  if(!/<title>\s*[^<]+\s*<\/title>/i.test(html))err('Missing title: '+route);
  const ld=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  let articleObj,person;
  for(const [,raw] of ld){
    try {
      const data=JSON.parse(raw);const objs=data['@graph']|| (Array.isArray(data)?data:[data]);
      for(const x of objs){
        if(x['@type']==='Article')articleObj=x;
        if(x['@type']==='Person')person=x;
      }
    }catch{err('Unparseable JSON-LD: '+route);}
  }
  if(!articleObj||articleObj.url!==expectedUrl||!articleObj.datePublished||
     !String(articleObj.image||'').includes(image)||!articleObj.author?.['@id'])
    err('Missing/invalid Article JSON-LD: '+route);
  if(!person&&!html.includes('https://www.ivandubai.xyz/#person'))
    err('Missing Person reference: '+route);
  const twin=(locale==='en'?'':'en/')+sec+'/'+slug+'/index.html';
  if(existsSync(join(currentDir,twin))){
    const counterpart=read(join(currentDir,twin));
    if(!html.includes('hreflang="en"')||!html.includes('hreflang="ru"')||
       !counterpart.includes('hreflang="en"')||!counterpart.includes('hreflang="ru"'))
      err('Missing reciprocal hreflang: '+route);
  }
  if(!read(join(currentDir,'sitemap-0.xml')).includes(expectedUrl))
    err('Missing sitemap URL: '+route);
  if(sec==='blog'&&existsSync(join(currentDir,'rss.xml'))&&!read(join(currentDir,'rss.xml')).includes(expectedUrl))
    err('Missing RSS URL: '+route);
  return {file,route,image};
}
try {
  const diff=execFileSync('git',['diff','--name-status','--no-renames',baseSha,'HEAD'],{encoding:'utf8'});
  const added=[],assets=[],unrelated=[],protectedChanged=[];
  for(const line of diff.trim().split('\n').filter(Boolean)){
    const [status,file]=line.split('\t');
    if(/^src\/content\/(blog|cases)\//.test(file)){
      if(status==='A')added.push(file);
      else protectedChanged.push(file);
    }else if(/^public\/[a-zA-Z0-9_.-]+\.(jpg|jpeg|png|webp|avif)$/i.test(file)&&status==='A'){
      assets.push(file);
    }else if((/^src\/content\//.test(file)||/^public\//.test(file))&&status!=='A'){
      protectedChanged.push(file);
    }else unrelated.push(file);
  }
  const b=files(baseDir),c=files(currentDir);
  const changes=[...new Set([...b.keys(),...c.keys()])].filter(x=>
    !b.has(x)||!c.has(x)||!readFileSync(b.get(x)).equals(readFileSync(c.get(x)))
  ).sort();
  const pages=added.map(checkPage).filter(Boolean);
  const technical=!added.length;
  if(protectedChanged.length)err('Protected published file changed — explicit Owner approval required: '+protectedChanged.join(', '));
  if(!technical&&unrelated.length)err('Content PR contains unrelated source changes: '+unrelated.join(', '));
  if(added.length){
    const allowed=(p)=>p==='index.html'||p==='en/index.html'||p==='rss.xml'||
      /^sitemap(?:-index|-0)?\.xml$/.test(p)||
      /^(?:en\/)?(?:blog|cases)\//.test(p)||assets.includes('public/'+p);
    for(const changed of changes)if(!allowed(changed))err('Unexpected generated output: '+changed);
    for(const p of pages)if(!changes.includes(p.route+'index.html'))err('New page missing in output diff: '+p.route);
  }
  console.log('SOURCE_DIFF_BEGIN');
  for(const line of diff.trim().split('\n').filter(Boolean))console.log('SOURCE '+line);
  console.log('SOURCE_DIFF_END');
  console.log('OUTPUT_DIFF_BEGIN');
  for(const changed of changes)console.log('OUTPUT '+changed);
  console.log('OUTPUT_DIFF_END');
  console.log('QA '+(issues.length?'FAIL':'PASS')+' baseline='+b.size+
    ' candidate='+c.size+' new_pages='+added.length+' changed_outputs='+changes.length);
  if(technical&&!issues.length)console.log('TECHNICAL PR — Claude review required');
  for(const page of pages)console.log('PAGE '+JSON.stringify(page));
}catch(e){err(String(e.message||e));}
if(issues.length){for(const issue of issues)console.error('QA FAIL: '+issue);process.exit(1);}
