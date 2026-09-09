import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, LayoutGrid, Building2, Layers, Puzzle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const SERVICES = [
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'Professional, mobile-first websites designed to explain your services, build trust and turn visitors into enquiries.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    desc: 'E-commerce websites with product catalogues, mobile-friendly shopping, checkout and payment integrations such as M-Pesa.',
  },
  {
    icon: LayoutGrid,
    title: 'Web Applications',
    desc: 'Custom web applications that digitize business workflows, customer processes, dashboards and internal operations.',
  },
  {
    icon: Building2,
    title: 'Business Management Systems',
    desc: 'Custom management systems for schools, businesses and organizations that need to replace manual processes with connected digital workflows.',
  },
  {
    icon: Layers,
    title: 'SaaS Products',
    desc: 'SaaS products designed for recurring-revenue businesses, customer portals, subscriptions and multi-user workflows.',
  },
  {
    icon: Puzzle,
    title: 'Custom Solutions',
    desc: 'Bespoke digital systems built around requirements that need a more tailored solution.',
  },
];

const ServicesSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading
      title="Web Design, Development & Business Software"
      subtitle="From professional business websites and online stores to custom web applications and internal systems, we build digital products around how your business works."
      tone="light"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className="card-light p-7 md:p-8 h-full flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,24,31,.08)]"
        >
          <div className="w-11 h-11 rounded-xl bg-ember-soft flex items-center justify-center mb-6">
            <s.icon size={20} className="text-ember" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-semibold text-paper-ink mb-2">{s.title}</h3>
          <p className="text-sm text-slate leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ServicesSlide;
