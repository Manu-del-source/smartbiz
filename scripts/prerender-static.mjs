import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';

const SITE = 'https://smartbiz365.site';
const routes = ['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404'];

const metadata = {
  '/': { title: 'SmartBiz | Web Design & Business Software for Kenya', description: 'SmartBiz builds fast, mobile-first websites and business software for Kenyan companies. Get a professional web presence designed to attract customers and grow.' },
  '/services': { title: 'Web Design & Development Services | SmartBiz Kenya', description: 'Explore SmartBiz web design, e-commerce, custom web applications, business systems, redesigns and technical SEO services for Kenyan businesses.' },
  '/work': { title: 'SmartBiz Portfolio | Kenyan Business Websites & Apps', description: 'See selected SmartBiz website projects for restaurants, hotels, retailers and event brands. Explore live work built for real Kenyan businesses.' },
  '/about': { title: 'About SmartBiz | Web Design for Kenyan Business Growth', description: 'Learn how SmartBiz approaches web design and development for Kenyan businesses, with practical strategy, mobile-first design and ongoing support.' },
  '/process': { title: 'Our Web Development Process | SmartBiz Kenya Guide', description: 'See the SmartBiz web development process, from discovery and planning through design, development, launch, SEO, testing and ongoing support.' },
  '/pricing': { title: 'Website & Software Pricing | SmartBiz Kenya Studio', description: 'Explore SmartBiz website and software pricing guidance for Kenyan businesses, with clear project scopes and practical options for different needs.' },
  '/faq': { title: 'SmartBiz FAQ | Web Design, SEO & Software in Kenya', description: 'Find answers to common SmartBiz questions about website development, e-commerce, timelines, pricing, SEO, support and working with Kenyan businesses.' },
  '/contact': { title: 'Contact SmartBiz | Web Design & Development in Kenya', description: 'Contact SmartBiz in Eldoret, Kenya to discuss a business website, online store, web application or custom software project with our team today.' },
  '/404': { title: 'SmartBiz Page Not Found | Kenya Web Design & Development', description: 'The SmartBiz page you requested could not be found. Return to the homepage to explore our web design, development and business software services.' },
};

const template = readFileSync('dist/index.html', 'utf8');
const server = await import(new URL('../dist/server/entry-server.js', import.meta.url).href);

function stripHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
}

function schema(route, page) {
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'SmartBiz', url: SITE, logo: `${SITE}/favicon-32x32.png`, areaServed: { '@type': 'Country', name: 'Kenya' } };
  const webPage = { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, about: { '@id': `${SITE}/#organization` } };
  const breadcrumb = route !== '/' && route !== '/404' ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE }, { '@type': 'ListItem', position: 2, name: page.title, item: canonical }] } : null;
  return [organization, webPage, ...(breadcrumb ? [breadcrumb] : [])];
}

function buildHead(route, page) {
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  const originalHead = (template.match(/<head>[\s\S]*?<\/head>/i) || [''])[0];
  const assetHead = originalHead
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  return `<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}">
<meta property="og:type" content="website"><meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="SmartBiz"><meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${page.title}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}">
<meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${SITE}/og-image.png">
${assetHead.replace(/^<head>|<\/head>$/gi, '')}
${schema(route,page).map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('')}
</head>`;
}

for (const route of routes) {
  const page = metadata[route];
  const rendered = await server.render(route);
  const body = stripHeadTags(rendered.html);
  const html = template
    .replace(/<head>[\s\S]*?<\/head>/i, buildHead(route, page))
    .replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${body}</div>`);
  const target = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`;
  mkdirSync(target.includes('/') ? target.slice(0, target.lastIndexOf('/')) : 'dist', { recursive: true });
  writeFileSync(target, html);
}

rmSync('dist/server', { recursive: true, force: true });
console.log(`Pre-rendered real React markup for ${routes.length} routes.`);
