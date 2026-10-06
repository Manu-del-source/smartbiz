import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Layout from './Layout';
export default function NotFound() {
  return <Layout><SEO title="Page Not Found | SmartBiz Kenya" description="The SmartBiz page you requested could not be found. Return to the homepage to explore our web design, development and business software services." path="/404" breadcrumb={['Home','Page Not Found']} /><section className="container mx-auto px-5 md:px-10 pt-40 pb-28 min-h-[70vh]"><div className="max-w-2xl"><p className="eyebrow mb-4">404 · Not found</p><h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight">That page does not exist.</h1><p className="mt-6 text-lg text-mist">The URL may have changed or the page may have been removed.</p><div className="mt-9 flex flex-wrap gap-4"><Link className="btn-primary" to="/">Back to SmartBiz</Link><Link className="btn-outline-dark" to="/services">Explore services</Link></div></div></section></Layout>;
}
