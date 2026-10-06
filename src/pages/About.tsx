import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const WhySlide = lazy(() => import('../components/slides/WhySlide'));
const OutcomesSlide = lazy(() => import('../components/slides/OutcomesSlide'));
export default function About() {
  return <Layout><SEO title="About SmartBiz | Web Design for Kenyan Business Growth" description="Learn how SmartBiz approaches web design and development for Kenyan businesses, with practical strategy, mobile-first design and ongoing support." path="/about" breadcrumb={['Home','About']} /><PageIntro title="Digital products built around real businesses">SmartBiz is a web design and development studio in Eldoret, Kenya. We focus on useful websites and software that help businesses communicate, sell and operate better.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-ink"><WhySlide /></section><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><OutcomesSlide /></section></Suspense></Layout>;
}
