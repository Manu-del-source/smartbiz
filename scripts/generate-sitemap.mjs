import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = 'https://smartbiz365.site';
const routes = ['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact'];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${SITE}${route === '/' ? '/' : route}</loc></url>`).join('\n')}
</urlset>
`;
mkdirSync(resolve('public'), { recursive: true });
writeFileSync(resolve('public/sitemap.xml'), xml);
console.log(`Generated sitemap.xml for ${routes.length} routes.`);
