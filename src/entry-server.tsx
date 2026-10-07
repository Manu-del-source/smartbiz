import { prerender } from 'react-dom/static';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import Process from './pages/Process';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ServerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="/process" element={<Process />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export async function render(url: string): Promise<{ html: string }> {
  // prerender() waits for lazy()/Suspense content, unlike renderToString().
  const { prelude } = await prerender(
    <HelmetProvider>
      <MemoryRouter initialEntries={[url]}>
        <ServerRoutes />
      </MemoryRouter>
    </HelmetProvider>,
    // Inline every Suspense boundary as plain HTML (no hidden div + $RC reveal script).
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  return { html: await new Response(prelude).text() };
}
