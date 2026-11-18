#!/usr/bin/env node
/**
 * Verify an Owner-supplied hero is visible in built HTML.
 * Frontmatter seo.image alone is insufficient because Astro templates render Content.
 * Usage: node scripts/verify-publication-hero.mjs --route /en/blog/post-28/ --image /post-28.jpg
 * Read-only and dependency-free. Run after TZ=UTC npm run build.
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const args = process.argv.slice(2);
function option(name) {
  const i = args.indexOf(name);
  if (i < 0 || !args[i + 1]) throw new Error('Missing ' + name);
  return args[i + 1];
}
function cleanPath(value, name) {
  if (!value.startsWith('/') || value.includes('?') || value.includes('#'))
    throw new Error(name + ' must start with / and contain no query/hash');
  const parts = value.split('/').filter(Boolean);
  if (!parts.length || parts.some(p => p === '.' || p === '..' || !/^[a-zA-Z0-9_.-]+$/.test(p)))
    throw new Error('Invalid ' + name + ' path');
  return parts.join('/');
}
function attr(tag, name) {
  const re = new RegExp('\\s' + name + '\\s*=\\s*"([^"]*)"', 'i');
  return tag.match(re)?.[1] ?? null;
}
function fail(reason) {
  console.error('HERO FAIL: ' + reason);
  process.exitCode = 1;
}
try {
  const route = cleanPath(option('--route'), 'route');
  const image = '/' + cleanPath(option('--image'), 'image');
  if (!/^(?:en\/)?(?:blog|cases)\/.+$/.test(route))
    throw new Error('Route must be a Blog or Case detail page');
  const dist = resolve('dist');
  const page = resolve(dist, route, 'index.html');
  const asset = resolve(dist, image.slice(1));
  if (!page.startsWith(dist + sep) || !asset.startsWith(dist + sep))
    throw new Error('Path escape detected');
  const html = readFileSync(page, 'utf8');
  const assetStats = statSync(asset);
  if (!assetStats.isFile() || assetStats.size < 1) fail('Built asset is not a nonempty file');
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
  if (!article) throw new Error('No rendered article body');
  const imgs = [...article.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  const visible = imgs.filter(tag => attr(tag, 'src') === image);
  if (visible.length !== 1)
    fail('Expected ONE article body img src="' + image + '", found ' + visible.length);
  if (visible.length === 1 && !(attr(visible[0], 'alt') || '').trim())
    fail('Missing alt on visible image');
  const og = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => m[0])
    .find(tag => attr(tag, 'property') === 'og:image');
  const ogValue = og ? attr(og, 'content') : null;
  if (!ogValue) fail('Missing og:image');
  else if (new URL(ogValue, 'https://www.ivandubai.xyz').pathname !== image)
    fail('og:image differs from visible body image');
  const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(m => m[1]);
  if (!ld.some(s => s.includes(image))) fail('Article JSON-LD omits image');
  if (!process.exitCode)
    console.log('HERO PASS route=/' + route + '/ image=' + image + ' bytes=' + assetStats.size);
} catch (error) {
  fail(error.message);
}
