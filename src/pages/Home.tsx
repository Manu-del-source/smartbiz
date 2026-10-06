import { Suspense, lazy, type ComponentType } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import Hero from '../components/slides/HeroSlide';

const Services = lazy(() => import('../components/slides/ServicesSlide'));
const Portfolio = lazy(() => import('../components/slides/PortfolioSlide'));
const Why = lazy(() => import('../components/slides/WhySlide'));
const Outcomes = lazy(() => import('../components/slides/OutcomesSlide'));
const Process = lazy(() => import('../components/slides/ProcessSlide'));
const Pricing = lazy(() => import('../components/slides/PricingSlide'));
const FAQ = lazy(() => import('../components/slides/FAQSlide'));
const Contact = lazy(() => import('../components/slides/ContactSlide'));

type Section = {
  id: string;
  component: ComponentType;
  raised: boolean;
};

const sections: Section[] = [
  { id: 'services', component: Services, raised: false },
  { id: 'work', component: Portfolio, raised: true },
  { id: 'why', component: Why, raised: false },
  { id: 'outcomes', component: Outcomes, raised: true },
  { id: 'process', component: Process, raised: false },
  { id: 'pricing', component: Pricing, raised: true },
  { id: 'faq', component: FAQ, raised: false },
  { id: 'contact', component: Contact, raised: true },
];

export default function Home() {
  return (
    <Layout>
      <SEO
        title="SmartBiz | Web Design & Business Software in Kenya"
        description="SmartBiz builds fast, mobile-first websites and business software for Kenyan companies. Get a professional web presence designed to attract customers and grow."
        path="/"
      />
      <section id="home" className="relative w-full py-20 md:py-28 pt-32 md:pt-40 scroll-mt-20 bg-ink text-bone overflow-hidden">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="relative z-10"><Hero /></div>
      </section>
      <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-ember font-display text-2xl">SmartBiz</div>}>
        {sections.map(({ id, component: Component, raised }) => (
          <section key={id} id={id} className={`relative w-full py-20 md:py-28 scroll-mt-20 border-t border-white/[0.06] ${raised ? 'bg-surface' : 'bg-ink'}`}>
            <div className="relative z-10"><Component /></div>
          </section>
        ))}
      </Suspense>
    </Layout>
  );
}
