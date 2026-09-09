import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const PLANS = [
  {
    name: 'Landing Page',
    price: 'KES 15,000',
    desc: 'A single, focused page to introduce your business and drive one clear action.',
    features: ['Single page design', 'Mobile-first layout', 'WhatsApp contact'],
  },
  {
    name: 'Business Website',
    price: 'KES 30,000',
    desc: 'A multi-page website that presents your services and builds credibility.',
    features: ['Multiple pages', 'Mobile-first layout', 'Contact form', 'Basic SEO setup'],
    recommended: true,
  },
  {
    name: 'Advanced Website',
    price: 'KES 50,000',
    desc: 'A larger site with custom features built around how your business works.',
    features: ['Custom page templates', 'Advanced interactions', 'Content structured for growth'],
  },
  {
    name: 'E-commerce',
    price: 'KES 60,000',
    desc: 'An online store built for product discovery, checkout and growth.',
    features: ['Product catalog & cart', 'M-Pesa checkout', 'Order management'],
  },
  {
    name: 'SaaS / Custom System',
    price: 'From KES 100,000',
    desc: 'A bespoke software product or business system, scoped to your requirements.',
    features: ['Scoped to your requirements', 'Custom workflows', 'Ongoing collaboration'],
  },
];

const PricingSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading
      title="Simple, transparent packages"
      subtitle="Fixed-price packages for business websites, e-commerce stores and custom systems, priced in Kenyan shillings, with maintenance available after launch."
      tone="dark"
    />

    <div className="divide-y divide-white/10 border-y border-white/10">
      {PLANS.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className={`grid grid-cols-1 lg:grid-cols-[1.3fr_1.6fr_auto_auto] gap-4 lg:gap-8 items-center py-8 ${
            p.recommended ? 'lg:-mx-6 lg:px-6 bg-ember/[0.06]' : ''
          }`}
        >
          <div>
            {p.recommended && (
              <span className="inline-block text-[11px] font-semibold text-ember uppercase tracking-wide mb-1.5">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="text-sm text-mist mt-1 max-w-sm">{p.desc}</p>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-sm text-mist">
                <Check size={14} className="text-ember flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="text-xl font-semibold text-white whitespace-nowrap">{p.price}</div>

          <Button
            href="#contact"
            variant={p.recommended ? 'primary' : 'outline-dark'}
            className="w-full lg:w-auto text-sm py-2.5 px-6"
          >
            Get Started
          </Button>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-8 text-sm text-mist">
      <span><span className="text-white font-semibold">Maintenance:</span> KES 5,000/month</span>
      <span><span className="text-white font-semibold">Hourly rate:</span> KES 2,000/hour</span>
    </div>

    <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10">
      <p className="text-lg text-white">Need something custom?</p>
      <Button href="#contact" variant="outline-dark">Let&rsquo;s discuss your project</Button>
    </div>
  </div>
);

export default PricingSlide;
