import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';

const routes = ['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404'];
const port = 4173;
const base = `http://127.0.0.1:${port}`;

function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Vite preview server did not start in time')), 30000);
    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes('Local:') || text.includes(`localhost:${port}`) || text.includes(`127.0.0.1:${port}`)) {
        clearTimeout(timer);
        proc.stdout.off('data', onData);
        resolve();
      }
    };
    proc.stdout.on('data', onData);
    proc.once('error', reject);
  });
}

const server = spawn('npm', ['exec', 'vite', '--', 'preview', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

try {
  await waitForServer(server);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (const route of routes) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`${base}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForSelector('h1', { timeout: 10000 });

    const html = await page.content();
    if (consoleErrors.length || pageErrors.length) {
      throw new Error(`Browser errors on ${route}: ${[...consoleErrors, ...pageErrors].join(' | ')}`);
    }

    const viewportResults = [];
    for (const width of [320, 768, 1024]) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      await page.reload({ waitUntil: 'networkidle0', timeout: 60000 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      viewportResults.push({ width, overflow });
    }
    const badViewport = viewportResults.find((item) => item.overflow);
    if (badViewport) throw new Error(`Horizontal overflow on ${route} at ${badViewport.width}px`);

    const target = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : `dist${route}/index.html`;
    mkdirSync(join('dist', route === '/' ? '' : route.slice(1)), { recursive: true });
    writeFileSync(target, html);
    await page.close();
  }

  await browser.close();
  console.log(`Prerendered and browser-verified ${routes.length} routes at 320px, 768px and 1024px.`);
} finally {
  server.kill('SIGTERM');
  if (existsSync('dist/index.html')) readFileSync('dist/index.html');
}
