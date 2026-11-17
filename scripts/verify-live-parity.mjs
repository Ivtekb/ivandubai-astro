#!/usr/bin/env node
// Independent production parity gate after a merge to main.
// All published build files must be HTTP 200 and byte-identical; no mutations.
import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
const root=resolve('dist');
const origin='https://www.ivandubai.xyz/';
const maxMs=Number(process.env.PRODUCTION_VERIFY_TIMEOUT_MS||240000);
const intervalMs=8000, parallelism=12;
const list=[];
function collect(dir) {
  for(const e of readdirSync(dir,{withFileTypes:true})){
    const full=join(dir,e.name);
    if(e.isDirectory())collect(full);
    else if(e.isFile()) {
      const name=relative(root,full).split(sep).join('/');
      const dest=name==='index.html'?'':name.endsWith('/index.html')?name.slice(0,-10):name;
      list.push({full,name,url:origin+dest});
    }
  }
}
collect(root);
async function checkOne(item) {
  try {
    const response=await fetch(item.url,{
      headers:{'Cache-Control':'no-cache','User-Agent':'ivandubai-release-audit/1.0'},
      redirect:'follow',signal:AbortSignal.timeout(12000)
    });
    if(response.status!==200)return item.name+' HTTP '+response.status;
    const bytes=Buffer.from(await response.arrayBuffer());
    return bytes.equals(readFileSync(item.full))?null:item.name+' BYTE_MISMATCH';
  }catch(e){return item.name+' '+String(e.message||e);}
}
async function checkAll() {
  let index=0;
  const errors=[];
  async function worker(){
    while(index<list.length){
      const item=list[index++];
      const error=await checkOne(item);
      if(error)errors.push(error);
    }
  }
  await Promise.all(Array.from({length:parallelism},worker));
  return errors;
}
const end=Date.now()+maxMs;
for(let attempt=1;;attempt++) {
  const failures=await checkAll();
  if(!failures.length){
    console.log('PRODUCTION PASS '+list.length+'/'+list.length+' files byte-identical; attempts='+attempt);
    process.exit(0);
  }
  if(Date.now()+intervalMs>=end){
    console.error('PRODUCTION FAIL '+failures.length+'/'+list.length+' files');
    for(const error of failures.slice(0,30))console.error(' - '+error);
    process.exit(1);
  }
  console.log('Waiting for exact Vercel deployment: '+failures.length+' files not yet identical (attempt '+attempt+')');
  await new Promise(res=>setTimeout(res,intervalMs));
}
