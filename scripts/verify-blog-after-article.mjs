#!/usr/bin/env node
// Validate rendered RU/EN Blog detail parity after a clean Astro build.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] || 'dist');
const issues = [];
const counts = { ru: 0, en: 0 };
function check(locale) {
    const base = join(root, ...(locale === 'en' ? ['en', 'blog'] : ['blog']));
    if (!existsSync(base)) { issues.push('Missing Blog output directory: ' + base); return; }
    for (const entry of readdirSync(base, { withFileTypes: true })) {
        if (!entry.isDirectory() || /^\d+$/.test(entry.name)) continue;
        const file = join(base, entry.name, 'index.html');
        if (!existsSync(file)) continue;
        counts[locale]++;
        const html = readFileSync(file, 'utf8');
        const page = (locale === 'en' ? '/en' : '') + '/blog/' + entry.name + '/';
        const canonical = 'https://www.ivandubai.xyz' + page;
        const wrap = html.match(/<div\b[^>]*\bdata-blog-after-article(?:\s|=|>)[\s\S]*?<\/div>/i)?.[0] || '';
        const share = html.match(/<button\b[^>]*\bdata-blog-share(?:\s|=|>)[^>]*>[\s\S]*?<\/button>/i)?.[0] || '';
        const expectedLabel = locale === 'ru' ? 'Поделиться' : 'Share';
        const expectedRelated = locale === 'ru' ? 'Читайте также' : 'Read next';
        // Preserve SEO and AI search eligibility while changing visible Blog navigation.
        if (!html.includes('<html lang="' + locale + '"')) issues.push('Wrong document language: ' + page);
        const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
            .map((match) => match[0]).find((tag) => /\brel="canonical"/i.test(tag));
        if (!canonicalTag || !canonicalTag.includes('href="' + canonical + '"')) issues.push('Canonical changed: ' + page);
        if (!/<meta\b[^>]*\bproperty="og:image"/i.test(html)) issues.push('OG image missing: ' + page);
        const jsonLd = [...html.matchAll(/<script\b[^>]*\btype="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
        const schema = [];
        for (const match of jsonLd) {
            try {
                const value = JSON.parse(match[1]);
                schema.push(...(Array.isArray(value) ? value : Array.isArray(value['@graph']) ? value['@graph'] : [value]));
            } catch {
                issues.push('Invalid JSON-LD: ' + page);
            }
        }
        if (!schema.some((item) => item['@type'] === 'Article' && item.url === canonical))
            issues.push('Article schema missing or wrong URL: ' + page);
        if (!schema.some((item) => item['@type'] === 'Person' && item['@id'] === 'https://www.ivandubai.xyz/#person'))
            issues.push('Person schema missing: ' + page);
        const twin = join(root, ...(locale === 'en' ? ['blog'] : ['en', 'blog']), entry.name, 'index.html');
        if (existsSync(twin) && (!html.includes('hreflang="ru"') || !html.includes('hreflang="en"')))
            issues.push('Reciprocal language alternates missing: ' + page);
        if (!wrap || !html.includes('data-locale="' + locale + '"')) issues.push('Missing or wrong locale after-article: ' + page);
        if (!share || !share.includes(expectedLabel) || !share.includes('data-url="' + canonical + '"')) issues.push('Wrong share label/URL: ' + page);
        if (!html.includes('data-success="' + (locale === 'ru' ? 'Ссылка скопирована' : 'Link copied') + '"')) issues.push('Missing localized share success: ' + page);
        if (/\baction=["']#["']/i.test(html)) issues.push('Broken subscription form action: ' + page);
        const aside = html.match(/<aside\b[^>]*\bdata-blog-related(?:\s|=|>)[^>]*>([\s\S]*?)<\/aside>/i)?.[1];
        if (aside) {
            if (!aside.includes(expectedRelated)) issues.push('Wrong related heading: ' + page);
            const links = [...aside.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((x) => x[1]);
            if (!links.length) issues.push('Related block has no links: ' + page);
            for (const link of links) {
                const valid = locale === 'en' ? /^\/en\/blog\/[a-z0-9-]+\/$/.test(link) : /^\/blog\/[a-z0-9-]+\/$/.test(link);
                if (!valid || link === page) issues.push('Cross-locale/self related link ' + link + ' on ' + page);
            }
        }
    }
}
check('ru'); check('en');
if (!counts.ru || !counts.en) issues.push('No Blog detail pages found in one or both locales');
if (issues.length) {
    for (const issue of issues) console.error('BLOG PARITY FAIL: ' + issue);
    process.exit(1);
}
console.log('BLOG PARITY PASS RU=' + counts.ru + ' EN=' + counts.en + ' generated article pages');
