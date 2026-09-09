// Dev-only smoke check: server-renders each real slide component to verify
// section content and the full-page heading sequence. Not part of the shipped build.
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

const server = await createServer({
  root: new URL('..', import.meta.url).pathname,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const order = [
    ['hero', '/src/components/slides/HeroSlide.tsx'],
    ['services', '/src/components/slides/ServicesSlide.tsx'],
    ['work', '/src/components/slides/PortfolioSlide.tsx'],
    ['why', '/src/components/slides/WhySlide.tsx'],
    ['outcomes', '/src/components/slides/OutcomesSlide.tsx'],
    ['process', '/src/components/slides/ProcessSlide.tsx'],
    ['pricing', '/src/components/slides/PricingSlide.tsx'],
    ['faq', '/src/components/slides/FAQSlide.tsx'],
    ['contact', '/src/components/slides/ContactSlide.tsx'],
    ['footer', '/src/components/Footer.tsx'],
  ];

  const seq = [];
  const out = {};
  for (const [name, path] of order) {
    const mod = await server.ssrLoadModule(path);
    const html = renderToString(React.createElement(mod.default));
    out[name] = html;
    seq.push(...[...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => `${name}:h${m[1]}`));
  }

  console.log('heading sequence:', seq.join(' '));
  const levels = seq.map((s) => +s.split(':h')[1]);
  let skip = null;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) skip = `${levels[i - 1]}->${levels[i]} (${seq[i - 1]} -> ${seq[i]})`;
  }
  console.log('skipped heading level:', skip);
  console.log('total h1 across page:', levels.filter((l) => l === 1).length);

  console.log('services subtitle:', out.services.includes('Web design and development for businesses in Kenya'));
  console.log('pricing subtitle:', out.pricing.includes('priced in Kenyan shillings'));
  console.log('process subtitle:', out.process.includes('from the first conversation to launch'));
  console.log('services h2 still "What we build":', out.services.includes('What we build'));
  console.log('form aria-labelledby:', out.contact.includes('aria-labelledby="contact-title"'));
  console.log('contact h2 id:', out.contact.includes('id="contact-title"'));
  console.log('input aria-labels:', out.contact.includes('aria-label="Full name"') && out.contact.includes('aria-label="Email address"') && out.contact.includes('aria-label="Phone (optional)"') && out.contact.includes('aria-label="Business (optional)"'));
  console.log('select aria-label:', out.contact.includes('aria-label="Project type (optional)"'));
  console.log('textarea aria-label:', out.contact.includes('aria-label="Tell us about your project"'));
  console.log('portfolio aria-labels:', out.work.includes('View Savory Kitchen — Food &amp; Beverage project') && out.work.includes('View StreetWear KE — Fashion &amp; Retail project') && out.work.includes('View Lumina Events — Entertainment &amp; Events project'));
  console.log('portfolio external links intact:', out.work.includes('https://poppies.vercel.app/#specials') && out.work.includes('https://verdant-blancmange-e5ed85.netlify.app/') && out.work.includes('https://lumina-rosy.vercel.app/'));
} finally {
  await server.close();
}
