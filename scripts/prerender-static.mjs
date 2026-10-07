import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';

const SITE = 'https://www.smartbiz365.site';
const routes = ['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404'];
const metadata = {
  '/': { title: 'SmartBiz | Web Design & Business Software for Kenya', description: 'SmartBiz builds fast, mobile-first websites and business software for Kenyan companies. Get a professional web presence designed to attract customers.', h1: 'Websites and business software that help Kenyan businesses grow' },
  '/services': { title: 'Web Design & Development Services | SmartBiz Kenya', description: 'Explore SmartBiz web design, e-commerce, custom web applications, business systems, redesigns and technical SEO services for Kenyan businesses.', h1: 'Web design, development and technical SEO services' },
  '/work': { title: 'SmartBiz Portfolio | Kenyan Business Websites & Apps', description: 'See selected SmartBiz website projects for restaurants, hotels, retailers and event brands. Explore live work built for real Kenyan businesses.', h1: 'Selected SmartBiz work' },
  '/about': { title: 'About SmartBiz | Web Design for Kenyan Business Growth', description: 'Learn how SmartBiz approaches web design and development for Kenyan businesses, with practical strategy, mobile-first design and ongoing support.', h1: 'Digital products built around real businesses' },
  '/process': { title: 'Our Web Development Process | SmartBiz Kenya Guide', description: 'See the SmartBiz web development process, from discovery and planning through design, development, launch, SEO, testing and ongoing support.', h1: 'A clear process from idea to launch' },
  '/pricing': { title: 'Website & Software Pricing | SmartBiz Kenya Studio', description: 'Explore SmartBiz website and software pricing guidance for Kenyan businesses, with clear project scopes and practical options for different needs.', h1: 'Clear project scopes and practical pricing' },
  '/faq': { title: 'SmartBiz FAQ | Web Design, SEO & Software in Kenya', description: 'Find answers to common SmartBiz questions about website development, e-commerce, timelines, pricing, SEO, support and working with Kenyan businesses.', h1: 'Frequently asked questions' },
  '/contact': { title: 'Contact SmartBiz | Web Design & Development in Kenya', description: 'Contact SmartBiz in Eldoret, Kenya to discuss a business website, online store, web application or custom software project with our team today.', h1: 'Start your SmartBiz project' },
  '/404': { title: 'SmartBiz Page Not Found | Kenya Web Design & Development', description: 'The SmartBiz page you requested could not be found. Return to the homepage to explore our web design, development and business software services.', h1: 'That page does not exist.' },
};
const template = readFileSync('dist/index.html', 'utf8');
const server = await import(new URL('../dist/server/entry-server.js', import.meta.url).href);
const cssFiles = readdirSync('dist/assets').filter((name) => name.endsWith('.css'));
if (!cssFiles.length) throw new Error('Prerender failed: Vite produced no CSS asset.');
const cssLinks = cssFiles.map((name) => `<link rel="stylesheet" crossorigin href="/assets/${name}">`).join('\n');
const moduleScript = (template.match(/<script[^>]+type=["']module["'][^>]+src=["']\/assets\/[^"']+["'][^>]*><\/script>/i) || [''])[0];
const originalHead = (template.match(/<head>[\s\S]*?<\/head>/i) || [''])[0];
const safeHeadAssets = originalHead.match(/<link[^>]+(?:rel=["']icon|rel=["']apple-touch-icon|rel=["']preconnect|fonts.googleapis.com|fonts.gstatic.com)[^>]*>/gi) ?? [];
function schema(route, page) {
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  const org = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'SmartBiz', url: SITE, logo: `${SITE}/favicon-32x32.png`, areaServed: { '@type': 'Country', name: 'Kenya' } };
  const web = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, about: { '@id': `${SITE}/#organization` } };
  return [org, web, ...(route !== '/' && route !== '/404' ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE }, { '@type': 'ListItem', position: 2, name: page.h1, item: canonical }] }] : [])];
}
for (const route of routes) {
  const page = metadata[route];
  const rendered = await server.render(route);
  const body = rendered.html.replace(/<title>[\s\S]*?<\/title>/gi, '').replace(/<meta\b[^>]*>/gi, '').replace(/<link\b[^>]*>/gi, '').replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  const head = `<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${page.title}</title><meta name="description" content="${page.description}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="SmartBiz"><meta property="og:image" content="${SITE}/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${page.title}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${SITE}/og-image.png">${safeHeadAssets.join('\n')}${cssLinks}${moduleScript}${schema(route,page).map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('')}</head>`;
  const rootMarkup = `<div id="root">${body}</div>`;
  const rootPlaceholder = '<div id="root"></div>';
  if (!template.includes(rootPlaceholder)) throw new Error('Prerender failed: Vite root placeholder not found.');
  const html = template.replace(/<head>[\s\S]*?<\/head>/i, head).replace(rootPlaceholder, rootMarkup);
  const target = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`;
  mkdirSync(target.slice(0, target.lastIndexOf('/')) || 'dist', { recursive: true });
  writeFileSync(target, html);
}
console.log(`Pre-rendered ${routes.length} routes with explicit Vite CSS assets.`);
