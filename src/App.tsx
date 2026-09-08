import { Suspense, lazy } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';

const Hero = lazy(() => import('./components/slides/HeroSlide'));
const Services = lazy(() => import('./components/slides/ServicesSlide'));
const Portfolio = lazy(() => import('./components/slides/PortfolioSlide'));
const Why = lazy(() => import('./components/slides/WhySlide'));
const Outcomes = lazy(() => import('./components/slides/OutcomesSlide'));
const Process = lazy(() => import('./components/slides/ProcessSlide'));
const Pricing = lazy(() => import('./components/slides/PricingSlide'));
const FAQ = lazy(() => import('./components/slides/FAQSlide'));
const Contact = lazy(() => import('./components/slides/ContactSlide'));

type Tone = 'dark' | 'light';

const SECTIONS: { id: string; component: React.LazyExoticComponent<React.FC>; tone: Tone; grid?: boolean }[] = [
  { id: 'home', component: Hero, tone: 'dark', grid: true },
  { id: 'services', component: Services, tone: 'light' },
  { id: 'work', component: Portfolio, tone: 'dark', grid: true },
  { id: 'why', component: Why, tone: 'light' },
  { id: 'outcomes', component: Outcomes, tone: 'dark', grid: true },
  { id: 'process', component: Process, tone: 'light' },
  { id: 'pricing', component: Pricing, tone: 'dark', grid: true },
  { id: 'faq', component: FAQ, tone: 'light' },
  { id: 'contact', component: Contact, tone: 'dark', grid: true },
];

function App() {
  return (
    <main className="relative bg-ink text-white selection:bg-ember/30 overflow-x-hidden">
      <Nav />
      <BackToTop />
      <WhatsAppButton />

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-ember font-display text-2xl">
            SmartBiz
          </div>
        }
      >
        {SECTIONS.map((section) => {
          const Component = section.component;
          const isDark = section.tone === 'dark';
          return (
            <section
              key={section.id}
              id={section.id}
              className={`relative w-full py-20 md:py-28 scroll-mt-20 ${
                section.id === 'home' ? 'pt-32 md:pt-40' : ''
              } ${isDark ? 'bg-ink text-white' : 'bg-paper text-paper-ink'} ${
                isDark && section.grid ? 'overflow-hidden' : ''
              }`}
            >
              {isDark && section.grid && <div className="grid-overlay" />}
              <div className="relative z-10">
                <Component />
              </div>
            </section>
          );
        })}
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
