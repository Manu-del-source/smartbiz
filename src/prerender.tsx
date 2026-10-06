import { PassThrough } from 'node:stream';
import { prerenderToNodeStream } from 'react-dom/static';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';

function streamToString(stream: NodeJS.ReadableStream) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', reject);
  });
}

export async function prerender(data: { url: string }) {
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider>
      <StaticRouter location={data.url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  );

  const html = await streamToString(prelude);
  const links = new Set<string>(['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404']);

  return { html, links };
}
