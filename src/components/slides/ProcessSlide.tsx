import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understand the business, goals, audience and requirements.' },
  { num: '02', title: 'Design', desc: 'Create the visual direction and user experience.' },
  { num: '03', title: 'Build', desc: 'Develop, integrate, test and optimize the product.' },
  { num: '04', title: 'Launch', desc: 'Deploy the project and provide post-launch support.' },
];

const ProcessSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading title="From idea to launch" tone="light" />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 relative">
      <div className="absolute top-6 left-[12.5%] right-[12.5%] h-px bg-paper-line hidden lg:block" />

      {STEPS.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="relative z-10"
        >
          <div className="w-12 h-12 rounded-full bg-white border border-paper-line flex items-center justify-center text-sm font-semibold text-ember mb-5">
            {s.num}
          </div>
          <h3 className="text-base font-semibold text-paper-ink mb-2">{s.title}</h3>
          <p className="text-sm text-slate leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ProcessSlide;
