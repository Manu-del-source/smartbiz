// Dev-only smoke check: server-renders the real components to verify heading
// hierarchy, section anchors and navigation links. Not part of the shipped build.
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
  const mod = await server.ssrLoadModule('/src/App.tsx');
  // Warm the SSR module cache so React.lazy sections resolve synchronously below.
  const slidePaths = {
    services: '/src/components/slides/ServicesSlide.tsx',
    work: '/src/components/slides/PortfolioSlide.tsx',
    why: '/src/components/slides/WhySlide.tsx',
    outcomes: '/src/components/slides/OutcomesSlide.tsx',
    process: '/src/components/slides/ProcessSlide.tsx',
    pricing: '/src/components/slides/PricingSlide.tsx',
    faq: '/src/components/slides/FAQSlide.tsx',
    contact: '/src/components/slides/ContactSlide.tsx',
  };
  for (const p of Object.values(slidePaths)) await server.ssrLoadModule(p);

  const html = renderToString(React.createElement(mod.default));

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  console.log('H1 count (full app render):', h1Count);
  console.log('Hero H1 text present:', html.includes('Digital systems built to help your business run, sell, and grow.'));

  const sectionsRendered = ['home', ...Object.keys(slidePaths)].every((id) =>
    html.includes(`id="${id}"`)
  );
  console.log('All 9 sections rendered in app output:', sectionsRendered);
  for (const id of ['home', ...Object.keys(slidePaths)]) {
    console.log(`  section #${id}:`, html.includes(`id="${id}"`));
  }

  console.log('logo home anchor present:', html.includes('href="#home"'));
  console.log('nav anchors:', ['services', 'work', 'why', 'process', 'pricing'].every((id) => html.includes(`href="#${id}"`)));
  console.log('footer anchors:', ['faq', 'contact'].every((id) => html.includes(`href="#${id}"`)));

  console.log('hero copy Kenya:', html.includes('businesses in Kenya'));
  console.log('services subtitle:', html.includes('Web design and development for businesses in Kenya'));
  console.log('pricing subtitle:', html.includes('priced in Kenyan shillings'));
  console.log('form aria-labelledby:', html.includes('aria-labelledby="contact-title"'));
  console.log('input aria-labels:', html.includes('aria-label="Full name"') && html.includes('aria-label="Email address"'));
  console.log('select aria-label:', html.includes('aria-label="Project type (optional)"'));
  console.log('portfolio aria-label:', html.includes('View Savory Kitchen — Food &amp; Beverage project'));
  console.log('header before main, footer after main:',
    html.indexOf('<header') < html.indexOf('<main') && html.indexOf('</main>') < html.indexOf('<footer'));

  const seq = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  let skip = null;
  for (let i = 1; i < seq.length; i++) {
    if (seq[i] > seq[i - 1] + 1) skip = `${seq[i - 1]}->${seq[i]}`;
  }
  console.log('heading sequence:', seq.join(','));
  console.log('skipped heading level:', skip);
} finally {
  await server.close();
}
