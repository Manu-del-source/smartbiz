import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://smartbiz365.site';
const routes = {
  '/': {
    title: 'SmartBiz | Web Design & Business Software in Kenya',
    description: 'SmartBiz builds fast, mobile-first websites and business software for Kenyan companies. Get a web presence designed to attract customers and grow.',
    h1: 'Websites and business software that help Kenyan businesses grow',
    intro: 'SmartBiz designs and develops fast, mobile-first websites, online stores and custom business systems for companies across Kenya.',
    sections: [
      ['Web Design & Development', 'Professional business websites built around your goals, customers and brand.'],
      ['E-commerce', 'Online stores with clear product journeys, mobile-first checkout experiences and search-friendly foundations.'],
      ['Custom Business Software', 'Practical web applications, dashboards, CRM and internal systems that make everyday work easier.'],
      ['Technical SEO', 'Crawlable architecture, clean URLs, structured data, performance and content foundations for search visibility.'],
    ],
  },
  '/services': {
    title: 'Web Design & Development Services | SmartBiz Kenya',
    description: 'Explore SmartBiz web design, e-commerce, custom web applications, business systems, redesigns and technical SEO services for Kenyan businesses.',
    h1: 'Web design, development and technical SEO services',
    intro: 'We build practical digital products for Kenyan businesses, from high-converting websites and online stores to custom business software.',
    sections: [['Business Websites', 'Responsive websites that communicate your offer clearly and turn visitors into enquiries.'], ['E-commerce', 'Search-friendly online stores designed for mobile shoppers and growing product catalogs.'], ['Web Applications', 'Custom dashboards, portals and web apps built around your business workflow.'], ['Business Systems', 'CRM, POS and operational software that centralizes data and reduces manual work.'], ['Technical SEO', 'Technical foundations that make pages easier for search engines and AI systems to understand.']],
  },
  '/work': {
    title: 'SmartBiz Portfolio | Kenyan Business Websites & Apps',
    description: 'See selected SmartBiz website projects for restaurants, hotels, retailers and event brands. Explore live work built for real Kenyan businesses.',
    h1: 'Selected SmartBiz work',
    intro: 'Explore projects across hospitality, food, retail and events, with each build shaped around a real business objective.',
    sections: [['Business Websites', 'Conversion-focused websites for brands that need a stronger online presence.'], ['Hospitality', 'Restaurant, hotel and event experiences designed for customers browsing on mobile.'], ['Business Applications', 'Custom software interfaces that turn operational requirements into usable digital tools.']],
  },
  '/about': {
    title: 'About SmartBiz | Web Design for Kenyan Business Growth',
    description: 'Learn how SmartBiz approaches web design and development for Kenyan businesses, with practical strategy, mobile-first design and ongoing support.',
    h1: 'Digital products built around real businesses',
    intro: 'SmartBiz is a web design and development studio in Eldoret, Kenya. We focus on useful websites and software that help businesses communicate, sell and operate better.',
    sections: [['Practical Strategy', 'Every build starts with the business goal, audience and customer journey.'], ['Mobile-First Design', 'Interfaces are designed for the devices Kenyan customers use every day.'], ['Built to Grow', 'Clean architecture makes it easier to add features, content and integrations later.']],
  },
  '/process': {
    title: 'Our Web Development Process | SmartBiz Kenya Guide',
    description: 'See the SmartBiz web development process, from discovery and planning through design, development, launch, SEO, testing and ongoing support.',
    h1: 'A clear process from idea to launch',
    intro: 'We keep projects structured and transparent so you always know what is happening, what comes next and what you are getting.',
    sections: [['1. Discovery', 'We clarify objectives, audience, pages, functionality and success criteria.'], ['2. Design', 'We shape the visual direction, information architecture and responsive experience.'], ['3. Development', 'We build the interface, integrations, content structure and technical foundations.'], ['4. Launch & SEO', 'We test routes, metadata, performance, accessibility, indexing and production behavior.']],
  },
  '/pricing': {
    title: 'Website & Software Pricing | SmartBiz Kenya Studio',
    description: 'Explore SmartBiz website and software pricing guidance for Kenyan businesses, with clear project scopes and practical options for different needs.',
    h1: 'Clear project scopes and practical pricing',
    intro: 'Every project is scoped around what your business actually needs. We discuss goals, features and delivery requirements before development begins.',
    sections: [['Business Websites', 'A strong option for companies that need a professional online presence and lead generation.'], ['Online Stores', 'For businesses that need products, categories, customer journeys and online selling.'], ['Custom Software', 'For workflows that require dashboards, accounts, integrations or business-specific automation.']],
  },
  '/faq': {
    title: 'SmartBiz FAQ | Web Design, SEO & Software in Kenya',
    description: 'Find answers to common SmartBiz questions about website development, e-commerce, timelines, pricing, SEO, support and working with Kenyan businesses.',
    h1: 'Frequently asked questions',
    intro: 'Answers to common questions about SmartBiz websites, e-commerce projects, custom software, timelines, pricing and support.',
    sections: [['How long does a website take?', 'The timeline depends on scope, content, integrations and feedback cycles.'], ['Do you build e-commerce websites?', 'Yes. We build online stores with responsive product experiences and search-friendly foundations.'], ['Do you provide SEO?', 'Yes. Technical SEO is built into the architecture, metadata, indexing and performance setup.'], ['Can you maintain the website after launch?', 'Yes. Ongoing improvements, content updates and technical support can be scoped after launch.']],
  },
  '/contact': {
    title: 'Contact SmartBiz | Web Design & Development in Kenya',
    description: 'Contact SmartBiz in Eldoret, Kenya to discuss a business website, online store, web application or custom software project with our team today.',
    h1: 'Start your SmartBiz project',
    intro: 'Tell us what your business needs and we will help you choose the right digital approach, from a professional website to custom software.',
    sections: [['Website Projects', 'Discuss a new business website, redesign or landing page.'], ['Online Stores', 'Plan an e-commerce experience around your products and customers.'], ['Custom Software', 'Tell us about the workflow, dashboard or business system you want to improve.']],
  },
  '/404': {
    title: 'SmartBiz Page Not Found | Kenya Web Design & Development',
    description: 'The SmartBiz page you requested could not be found. Return to the homepage to explore our web design, development and business software services.',
    h1: 'That page does not exist.',
    intro: 'The URL may have changed or the page may have been removed.',
    sections: [['Explore SmartBiz', 'Return to the homepage or explore our services and selected work.']],
  },
};

const indexHtml = readFileSync('dist/index.html', 'utf8');
const stylesheet = (indexHtml.match(/<link[^>]+rel="stylesheet"[^>]*>/i) || [''])[0];
const moduleScript = (indexHtml.match(/<script[^>]+type="module"[^>]*><\/script>/i) || [''])[0];
const faviconLinks = (indexHtml.match(/<link[^>]+(?:rel="icon"|rel="apple-touch-icon")[^>]*>/gi) || []).join('\n');
const logo = readdirSync('dist/assets').find((name) => /^smartbiz-logo-.*\.(png|webp|avif)$/i.test(name));
const logoMarkup = logo ? `<img src="/assets/${logo}" alt="SmartBiz logo" width="483" height="311" loading="eager">` : '';

function schema(route, page) {
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  return [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'SmartBiz', url: SITE, areaServed: { '@type': 'Country', name: 'Kenya' } },
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, about: { '@id': `${SITE}/#organization` } },
    ...(route !== '/' ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE }, { '@type': 'ListItem', position: 2, name: page.h1, item: canonical }] }] : []),
  ];
}

for (const [route, page] of Object.entries(routes)) {
  const canonical = `${SITE}${route === '/' ? '/' : route}`;
  const nav = ['/','/services','/work','/about','/process','/pricing','/faq','/contact'].map((href) => `<a href="${href}">${href === '/' ? 'Home' : href.slice(1).replace(/^./, (x) => x.toUpperCase())}</a>`).join(' · ');
  const sections = page.sections.map(([heading, body]) => `<section><h2>${heading}</h2><p>${body}</p></section>`).join('');
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title><meta name="description" content="${page.description}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}">
<meta property="og:type" content="website"><meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="SmartBiz"><meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${page.title}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}">
<meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${SITE}/og-image.png">
${faviconLinks}${stylesheet}
${schema(route,page).map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join('')}
</head>
<body>\n<div id="root">\n<header><a href="/" aria-label="SmartBiz homepage">${logoMarkup}</a><nav aria-label="Primary navigation">${nav}</nav></header>
<main><p>SmartBiz · Eldoret, Kenya</p><h1>${page.h1}</h1><p>${page.intro}</p>${sections}<p><a href="/contact">Start a Project</a></p></main>
${moduleScript}
</body>
</html>`;
  const target = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`;
  mkdirSync(join('dist', route === '/' || route === '/404' ? '' : route.slice(1)), { recursive: true });
  writeFileSync(target, html);
}
console.log(`Generated crawlable SEO HTML for ${Object.keys(routes).length} routes.`);
