import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const ServicesSlide = lazy(() => import('../components/slides/ServicesSlide'));
export default function Services() {
  return <Layout><SEO title="Web Design & Development Services | SmartBiz Kenya" description="Explore SmartBiz web design, e-commerce, custom web applications, business systems, redesigns and technical SEO services for Kenyan businesses." path="/services" breadcrumb={['Home','Services']} /><PageIntro title="Web design, development and technical SEO services">We build practical digital products for Kenyan businesses, from high-converting websites and online stores to custom business software.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><ServicesSlide /></section></Suspense></Layout>;
}
