#!/usr/bin/env node
// New article/case URL must be descriptive. A historic numeric translation exception
// is allowed ONLY when the counterpart exists in origin/main. No network calls.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const args = process.argv.slice(2);
function get(key) {
 const i = args.indexOf(key);
 return i === -1 ? null : args[i+1];
}
function abort(msg) { console.error('SLUG FAIL: ' + msg); process.exit(1); }
function parsed(route) {
 if (!route || !/^\/(?:en\/)?(?:blog|cases)\/[a-z0-9-]+\/$/.test(route))
  abort('Expected /blog/<slug>/, /en/blog/<slug>/, /cases/<slug>/ or /en/cases/<slug>/');
 const m = route.match(/^\/(en\/)?(blog|cases)\/([a-z0-9-]+)\/$/);
 return {en: !!m[1], section:m[2], slug:m[3]};
}
const route = get('--route');
const item = parsed(route);
const legacy = /^(?:post|case)-[0-9]+$/.test(item.slug);
if (item.slug.length > 70) abort('Slug exceeds recommended 70 characters');
if (!legacy && (item.slug.length < 8 || !item.slug.includes('-') || /--|^[-0-9]|-$/.test(item.slug) || /^(?:new|blog|article|post|case)-/.test(item.slug)))
 abort('New original route needs a short meaningful hyphenated slug');
if (legacy) {
 const counterpart = get('--legacy-counterpart');
 if (!counterpart) abort('Numeric slug disallowed for NEW original content; only a pre-existing published translation counterpart qualifies');
 const pair = parsed(counterpart);
 if (pair.section !== item.section || pair.slug !== item.slug || pair.en === item.en)
  abort('Legacy counterpart must be same ID and section in the other language');
 const parentPath = (item.section === 'blog' ? 'src/content/blog/' : 'src/content/cases/')
     + (pair.en ? 'en/' : '') + pair.slug + '.md';
 try {
  execFileSync('git', ['cat-file', '-e', 'origin/main:' + parentPath], {stdio:'ignore'});
 } catch {
  abort('Counterpart is not a published file in origin/main: '+parentPath);
 }
}
console.log('SLUG PASS ' + route + (legacy ? ' (verified legacy translation)' : ''));
