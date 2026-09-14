import { Suspense, lazy } from 'react';
import type { ComponentType } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
// Hero is imported eagerly (not lazy) since it renders the page's H1 and
// above-the-fold content — code-splitting it would delay first paint and
// the H1 behind an extra async chunk for both users and crawlers.
import Hero from './components/slides/HeroSlide';

const Services = lazy(() => import('./components/slides/ServicesSlide'));
const Portfolio = lazy(() => import('./components/slides/PortfolioSlide'));
const Why = lazy(() => import('./components/slides/WhySlide'));
const Outcomes = lazy(() => import('./components/slides/OutcomesSlide'));
const Process = lazy(() => import('./components/slides/ProcessSlide'));
const Pricing = lazy(() => import('./components/slides/PricingSlide'));
const FAQ = lazy(() => import('./components/slides/FAQSlide'));
const Contact = lazy(() => import('./components/slides/ContactSlide'));

type SectionDef = { id: string; component: ComponentType; surface?: 'raised' };

// One shared dark surface across the whole page (no more light/dark alternation).
// A handful of sections sit on a very slightly lifted charcoal panel — bg-surface —
// purely to break up long stretches of identical background, per the brief's
// "slightly lighter charcoal for cards/sections" direction.
const BELOW_FOLD_SECTIONS: SectionDef[] = [
  { id: 'services', component: Services },
  { id: 'work', component: Portfolio, surface: 'raised' },
  { id: 'why', component: Why },
  { id: 'outcomes', component: Outcomes, surface: 'raised' },
  { id: 'process', component: Process },
  { id: 'pricing', component: Pricing, surface: 'raised' },
  { id: 'faq', component: FAQ },
  { id: 'contact', component: Contact, surface: 'raised' },
];

function Section({ section }: { section: SectionDef }) {
  const Component = section.component;
  return (
    <section
      id={section.id}
      className={`relative w-full py-20 md:py-28 scroll-mt-20 border-t border-white/[0.06] ${
        section.surface === 'raised' ? 'bg-surface' : 'bg-ink'
      }`}
    >
      <div className="relative z-10">
        <Component />
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="relative bg-ink text-bone selection:bg-ember/30 overflow-x-hidden">
      {/* Single, page-wide grain texture — the one deliberate textural accent. */}
      <div className="grain-overlay" aria-hidden="true" />

      <Nav />
      <BackToTop />
      <WhatsAppButton />

      <section id="home" className="relative w-full py-20 md:py-28 pt-32 md:pt-40 scroll-mt-20 bg-ink text-bone overflow-hidden">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-ember font-display text-2xl">
            SmartBiz
          </div>
        }
      >
        {BELOW_FOLD_SECTIONS.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
