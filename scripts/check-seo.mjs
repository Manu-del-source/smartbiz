import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://smartbiz365.site';
const routes = {
  '/': ['dist/index.html'],
  '/services': ['dist/services/index.html', 'dist/services.html'],
  '/work': ['dist/work/index.html', 'dist/work.html'],
  '/about': ['dist/about/index.html', 'dist/about.html'],
  '/process': ['dist/process/index.html', 'dist/process.html'],
  '/pricing': ['dist/pricing/index.html', 'dist/pricing.html'],
  '/faq': ['dist/faq/index.html', 'dist/faq.html'],
  '/contact': ['dist/contact/index.html', 'dist/contact.html'],
  '/404': ['dist/404/index.html', 'dist/404.html'],
};

function findHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = join(dir, entry.name);
    return entry.isDirectory() ? findHtml(p) : entry.name.endsWith('.html') ? [p] : [];
  });
}
function firstMatch(html, re, label, file) {
  const m = html.match(re);
  if (!m) throw new Error(`SEO check failed: missing ${label} in ${file}`);
  return m[1] ?? '';
}
function resolveRouteFile(candidates) {
  const file = candidates.find(existsSync);
  if (!file) throw new Error(`SEO check failed: missing prerendered route: ${candidates[0]}`);
  return file;
}

if (!existsSync('dist')) throw new Error('dist directory is missing');
if (!existsSync('public/robots.txt') || !existsSync('public/llms.txt') || !existsSync('public/sitemap.xml')) {
  throw new Error('SEO check failed: robots.txt, llms.txt or sitemap.xml is missing');
}

for (const [route, candidates] of Object.entries(routes)) {
  const file = resolveRouteFile(candidates);
  const html = readFileSync(file, 'utf8');
  const title = firstMatch(html, /<title>([^<]*)<\/title>/i, 'title', file);
  const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i, 'meta description', file);
  const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i, 'canonical', file);
  if (title.length < 50 || title.length > 60) throw new Error(`SEO check failed: ${file} title is ${title.length} chars (50-60 required)`);
  if (description.length < 140 || description.length > 155) throw new Error(`SEO check failed: ${file} description is ${description.length} chars (140-155 required)`);
  const expected = `${SITE}${route === '/' ? '/' : route}`;
  if (canonical !== expected) throw new Error(`SEO check failed: ${file} canonical is ${canonical}, expected ${expected}`);
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) throw new Error(`SEO check failed: noindex found in ${file}`);
  if (!/<meta[^>]+property=["']og:image["'][^>]+content=["'][^"']+["']/i.test(html)) throw new Error(`SEO check failed: missing og:image in ${file}`);\n  if (!/<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']+["']/i.test(html)) throw new Error(`SEO check failed: missing compiled stylesheet in ${file}`);\n  for (const asset of [...html.matchAll(/(?:href|src)=["'](\\/assets\\/[^"']+)["']/gi)].map((m) => m[1])) { if (!existsSync(join('dist', asset.slice(1)))) throw new Error(`SEO check failed: missing referenced asset ${asset} in ${file}`); }
  const h1 = html.match(/<h1\b[^>]*>/gi) ?? [];
  if (h1.length !== 1) throw new Error(`SEO check failed: ${file} has ${h1.length} H1 elements`);
  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  for (const img of images) {
    const alt = img.match(/\balt=["']([^"']*)["']/i);
    if (!alt || !alt[1].trim()) throw new Error(`SEO check failed: image without descriptive alt in ${file}: ${img.slice(0,120)}`);
  }
}

const htmlFiles = findHtml('dist');
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<(?:a|link)[^>]+href=["']([^"'#?]+)[^"']*["'][^>]*>/gi)) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      const staticTarget = join('dist', href);
      const target = href === '/' ? 'dist/index.html' : `dist${href}/index.html`;
      const targetFile = existsSync(target) ? target : `dist${href}.html`;
      if (!existsSync(staticTarget) && !existsSync(targetFile) && !['/api/contact'].includes(href)) {
        throw new Error(`SEO check failed: broken internal link ${href} in ${file}`);
      }
    }
  }
}

console.log('SEO build checks passed: routes, titles, descriptions, canonicals, indexing, H1 count, images, OG images and internal links.');
