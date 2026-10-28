import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const PricingSlide = lazy(() => import('../components/slides/PricingSlide'));
export default function Pricing() {
  return <Layout><SEO title="Project Planning | SmartBiz Kenya Studio" description="Plan a website, online store or custom digital product with SmartBiz. Discuss your goals, features and delivery needs to receive a tailored project proposal." path="/pricing" breadcrumb={['Home','Project Planning']} /><PageIntro title="Let’s plan the right digital project">We’ll start with your goals, audience, essential features and timeline, then outline a practical scope of work and a tailored proposal before development begins.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><PricingSlide /></section></Suspense></Layout>;
}
