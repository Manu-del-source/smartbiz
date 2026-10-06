import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const PortfolioSlide = lazy(() => import('../components/slides/PortfolioSlide'));
export default function Work() {
  return <Layout><SEO title="SmartBiz Portfolio | Kenyan Business Websites & Apps" description="See selected SmartBiz website projects for restaurants, hotels, retailers and event brands. Explore live work built for real Kenyan businesses." path="/work" breadcrumb={['Home','Work']} /><PageIntro title="Selected work">Explore live SmartBiz projects across hospitality, food, retail and events, with every project linked to its live website.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><PortfolioSlide /></section></Suspense></Layout>;
}
