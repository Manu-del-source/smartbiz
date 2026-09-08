import React from 'react';
import { motion } from 'framer-motion';

const OUTCOMES = [
  'A website that builds trust.',
  'A digital storefront that helps you sell.',
  'A system that reduces manual work.',
  'A platform that gives your team better control.',
  'A scalable foundation for future growth.',
];

const OutcomesSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10 max-w-4xl">
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-white mb-12 md:mb-16"
    >
      Technology should make business easier.
    </motion.h2>

    <div>
      {OUTCOMES.map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="py-5 md:py-6 border-t border-white/10 last:border-b"
        >
          <p className="font-display text-xl sm:text-2xl text-white">{line}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default OutcomesSlide;
