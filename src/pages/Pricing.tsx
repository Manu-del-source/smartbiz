import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const PricingSlide = lazy(() => import('../components/slides/PricingSlide'));
export default function Pricing() {
  return <Layout><SEO title="Website & Software Pricing | SmartBiz Kenya Studio" description="Explore SmartBiz website and software pricing guidance for Kenyan businesses, with clear project scopes and practical options for different needs." path="/pricing" breadcrumb={['Home','Pricing']} /><PageIntro title="Clear project scopes and practical pricing">Every project is scoped around what your business actually needs. We discuss the goals, features and delivery requirements before development begins.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><PricingSlide /></section></Suspense></Layout>;
}
