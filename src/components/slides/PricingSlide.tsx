import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const PROJECT_TYPES = [
  {
    name: 'Business websites',
    desc: 'A professional, mobile-first website that explains your services and turns visitors into enquiries.',
    features: ['Brand-led design', 'Mobile responsive', 'Contact and enquiry flow'],
  },
  {
    name: 'E-commerce',
    desc: 'A product-led online store built to help customers browse, order and pay with confidence.',
    features: ['Product catalogue', 'Checkout planning', 'Payment integration options'],
    recommended: true,
  },
  {
    name: 'Custom platforms',
    desc: 'A web application, marketplace or business system shaped around your workflows and growth plans.',
    features: ['Requirements discovery', 'Custom workflows', 'Scalable architecture'],
  },
  {
    name: 'Redesign & ongoing support',
    desc: 'Improve an existing website, strengthen its foundations or get help maintaining it after launch.',
    features: ['UX and performance review', 'Technical improvements', 'Support options'],
  },
];

const PricingSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading
      title="A clear plan, built around your project"
      subtitle="We don’t publish one-size-fits-all prices. Every proposal is based on your goals, features, timeline and support needs—so you know what is included before work begins."
    />

    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10">
      {PROJECT_TYPES.map((project, i) => (
        <motion.article
          key={project.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className={`flex h-full flex-col border-r border-b border-white/10 p-6 sm:p-8 md:p-9 transition-colors hover:bg-white/[0.025] ${project.recommended ? 'bg-ember/[0.045]' : ''}`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.14em] text-mist/60">{String(i + 1).padStart(2, '0')}</span>
            {project.recommended && <span className="text-xs text-ember">Popular project type</span>}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight text-bone">{project.name}</h3>
          <p className="mt-3 mb-6 text-sm leading-relaxed text-mist">{project.desc}</p>
          <ul className="mb-8 space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-mist">
                <Check size={15} className="mt-0.5 shrink-0 text-ember" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="text-sm font-medium text-bone">Tailored proposal</span>
            <a href="/contact" className="inline-flex items-center gap-1.5 text-sm text-bone transition-colors hover:text-ember">
              Discuss this <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>

    <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
      <div>
        <h3 className="font-display text-2xl text-bone">Have a specific idea?</h3>
        <p className="mt-2 text-sm text-mist">Tell us what you need and we’ll outline the right next steps.</p>
      </div>
      <Button href="/contact" variant="primary">Request a proposal <ArrowUpRight size={16} /></Button>
    </div>
  </div>
);

export default PricingSlide;
