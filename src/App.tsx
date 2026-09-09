import { Suspense, lazy } from 'react';
import type { ComponentType } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
// Hero is imported eagerly (not lazy) since it renders the page's H1 and
// above-the-fold content \u2014 code-splitting it would delay first paint and
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

type Tone = 'dark' | 'light';
type SectionDef = { id: string; component: ComponentType; tone: Tone; grid?: boolean };

const BELOW_FOLD_SECTIONS: SectionDef[] = [
  { id: 'services', component: Services, tone: 'light' },
  { id: 'work', component: Portfolio, tone: 'dark', grid: true },
  { id: 'why', component: Why, tone: 'light' },
  { id: 'outcomes', component: Outcomes, tone: 'dark', grid: true },
  { id: 'process', component: Process, tone: 'light' },
  { id: 'pricing', component: Pricing, tone: 'dark', grid: true },
  { id: 'faq', component: FAQ, tone: 'light' },
  { id: 'contact', component: Contact, tone: 'dark', grid: true },
];

function Section({ section }: { section: SectionDef }) {
  const Component = section.component;
  const isDark = section.tone === 'dark';
  return (
    <section
      id={section.id}
      className={`relative w-full py-20 md:py-28 scroll-mt-20 ${
        isDark ? 'bg-ink text-white' : 'bg-paper text-paper-ink'
      } ${isDark && section.grid ? 'overflow-hidden' : ''}`}
    >
      {isDark && section.grid && <div className="grid-overlay" aria-hidden="true" />}
      <div className="relative z-10">
        <Component />
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="relative bg-ink text-white selection:bg-ember/30 overflow-x-hidden">
      <Nav />
      <BackToTop />
      <WhatsAppButton />

      <section id="home" className="relative w-full py-20 md:py-28 pt-32 md:pt-40 scroll-mt-20 bg-ink text-white overflow-hidden">
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
