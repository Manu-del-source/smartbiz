import { prerender as renderStatic } from 'react-dom/static';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

export async function prerender(data: { url: string }) {
  const { prelude } = await renderStatic(
    <HelmetProvider>
      <MemoryRouter initialEntries={[data.url]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  );

  const html = await new Response(prelude).text();
  const links = new Set<string>(['/', '/services', '/work', '/about', '/process', '/pricing', '/faq', '/contact', '/404']);

  return { html, links };
}
