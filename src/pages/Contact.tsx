import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const ContactSlide = lazy(() => import('../components/slides/ContactSlide'));
export default function Contact() {
  return <Layout><SEO title="Contact SmartBiz | Web Design & Development in Kenya" description="Contact SmartBiz in Eldoret, Kenya to discuss a business website, online store, web application or custom software project with our team today." path="/contact" breadcrumb={['Home','Contact']} /><PageIntro title="Start your project">Tell us what your business needs and we will help you choose the right digital approach, from a professional website to custom software.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><ContactSlide /></section></Suspense></Layout>;
}
