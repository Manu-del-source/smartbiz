import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'We understand your business, customers, goals and technical requirements before we design anything.' },
  { num: '02', title: 'Design', desc: 'We create the visual direction and user experience around your brand and customers.' },
  { num: '03', title: 'Build', desc: 'We develop, integrate, test and optimize the website or digital system.' },
  { num: '04', title: 'Launch', desc: 'We deploy the project, connect the required services and provide post-launch support.' },
];

const ProcessSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <SectionHeading title="Our Web Design & Development Process" tone="light" />

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
