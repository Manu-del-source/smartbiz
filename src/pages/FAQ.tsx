import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const FAQSlide = lazy(() => import('../components/slides/FAQSlide'));
export default function FAQ() {
  return <Layout><SEO title="SmartBiz FAQ | Web Design, SEO & Software in Kenya" description="Find answers to common SmartBiz questions about website development, e-commerce, timelines, pricing, SEO, support and working with Kenyan businesses." path="/faq" breadcrumb={['Home','FAQ']} /><PageIntro title="Frequently asked questions">Answers to common questions about SmartBiz websites, e-commerce projects, custom software, timelines, pricing and support.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><FAQSlide /></section></Suspense></Layout>;
}
