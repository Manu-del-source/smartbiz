import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, FileText, LayoutGrid, RefreshCw, Search } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const SERVICES = [
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional, mobile-first websites designed to explain your services, build trust and turn visitors into enquiries.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Websites',
    desc: 'Online stores with product catalogues, mobile-friendly checkout and payment integrations such as M-Pesa.',
  },
  {
    icon: FileText,
    title: 'Landing Pages',
    desc: 'A single, focused page built around one goal \u2014 launching an offer, a campaign or a new product quickly.',
  },
  {
    icon: LayoutGrid,
    title: 'Custom Web Applications',
    desc: 'Web applications and business management systems that digitize workflows, dashboards and internal operations.',
  },
  {
    icon: RefreshCw,
    title: 'Website Redesign',
    desc: 'Rebuilding or modernizing an existing website\u2014 improving its design, performance and mobile experience.',
  },
  {
    icon: Search,
    title: 'SEO Foundations',
    desc: 'New sites launch with technical SEO in place: clean metadata, structured data, sitemaps and semantic markup.',
  },
];

const ServicesSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading
      title="Web design, development & business software"
      subtitle="From professional business websites and online stores to custom web applications and internal systems, we build digital products around how your business works."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="p-7 md:p-8 border-r border-b border-white/10"
        >
          <s.icon size={22} className="text-bone mb-6" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-bone mb-2">{s.title}</h3>
          <p className="text-sm text-mist leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ServicesSlide;
