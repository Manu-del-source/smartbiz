import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Layout from './Layout';
import PageIntro from './PageIntro';
const ProcessSlide = lazy(() => import('../components/slides/ProcessSlide'));
export default function Process() {
  return <Layout><SEO title="Our Web Development Process | SmartBiz Kenya Guide" description="See the SmartBiz web development process, from discovery and planning through design, development, launch, SEO, testing and ongoing support." path="/process" breadcrumb={['Home','Process']} /><PageIntro title="A clear process from idea to launch">We keep projects structured and transparent so you always know what is happening, what comes next and what you are getting.</PageIntro><Suspense fallback={<div className="h-96" />}><section className="border-t border-white/[0.06] py-20 md:py-28 bg-surface"><ProcessSlide /></section></Suspense></Layout>;
}
