import React from 'react';
import { motion } from 'framer-motion';
import { Target, Smartphone, Zap, Tag, LifeBuoy, LayoutTemplate } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const REASONS = [
  { icon: Target, title: 'Built around your business', desc: 'Every website or software project starts with your goals, customers and workflow\u2014not a generic template.' },
  { icon: Smartphone, title: 'Mobile-first by default', desc: 'Most customers visit from a phone, so we design responsive experiences that work well across phones, tablets and desktops.' },
  { icon: Zap, title: 'Fast, modern and scalable', desc: 'Lightweight, responsive experiences built to perform across phones, tablets and desktops.' },
  { icon: Tag, title: 'Clear pricing', desc: 'You know the cost and what is included before development starts.' },
  { icon: LifeBuoy, title: 'Ongoing support', desc: 'We stay reachable after launch for updates, fixes, improvements and questions.' },
  { icon: LayoutTemplate, title: 'Business-focused design', desc: 'Design decisions are made to help you sell, communicate and operate\u2014not just to look good.' },
];

const WhySlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading title="Why businesses choose SmartBiz for web development" tone="light" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
      {REASONS.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className="flex gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-paper-dim flex items-center justify-center flex-shrink-0">
            <r.icon size={18} className="text-paper-ink" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-paper-ink mb-1.5">{r.title}</h3>
            <p className="text-sm text-slate leading-relaxed">{r.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default WhySlide;
