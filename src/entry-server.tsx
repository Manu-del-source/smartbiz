import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App';

export async function render(url: string): Promise<{ html: string }> {
  const output = new PassThrough();
  const chunks: Buffer[] = [];
  output.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
  const complete = new Promise<string>((resolve, reject) => {
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);
  });

  const { pipe } = renderToPipeableStream(
    <HelmetProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
    {
      onAllReady: () => pipe(output),
      onError: (error) => console.error(error),
    },
  );

  return { html: await complete };
}
