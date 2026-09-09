import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, LayoutGrid, Building2, Layers, Puzzle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const SERVICES = [
  {
    icon: Globe,
    title: 'Business Websites',
    desc: 'High-converting websites designed to establish credibility and generate leads.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce',
    desc: 'Modern online stores designed around product discovery, checkout and growth.',
  },
  {
    icon: LayoutGrid,
    title: 'Web Applications',
    desc: 'Custom applications built around specific business workflows.',
  },
  {
    icon: Building2,
    title: 'Business Management Systems',
    desc: 'Internal platforms for schools, businesses and organizations.',
  },
  {
    icon: Layers,
    title: 'SaaS Products',
    desc: 'Scalable subscription-based software products.',
  },
  {
    icon: Puzzle,
    title: 'Custom Solutions',
    desc: 'Bespoke digital systems built for requirements the above don\u2019t cover.',
  },
];

const ServicesSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading
      title="What we build"
      subtitle="Web design and development for businesses in Kenya — business websites, online stores, web applications and management systems, built around how you work."
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
