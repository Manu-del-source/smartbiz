import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const PROJECTS = [
  {
    title: 'Savory Kitchen',
    category: 'Food & Beverage',
    desc: 'A restaurant website built for high-conversion online ordering.',
    link: 'https://poppies.vercel.app/#specials',
    from: '#8a3b1f',
    to: '#c65a2c',
  },
  {
    title: 'StreetWear KE',
    category: 'Fashion & Retail',
    desc: 'A premium e-commerce website for urban footwear and fashion, with WhatsApp-based ordering.',
    link: 'https://verdant-blancmange-e5ed85.netlify.app/',
    from: '#1b1f24',
    to: '#3a4048',
  },
  {
    title: 'Lumina Events',
    category: 'Entertainment & Events',
    desc: 'A website for live entertainment events, designed to move ticket-buyers to act.',
    link: 'https://lumina-rosy.vercel.app/',
    from: '#33204f',
    to: '#5c3a82',
  },
];

const PortfolioSlide: React.FC = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <SectionHeading
        title="Selected work"
        subtitle="A few projects we've delivered for businesses across different industries."
        tone="dark"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="group card-dark overflow-hidden flex flex-col hover:border-white/25"
          >
            <div
              className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
            >
              <span className="font-display text-6xl md:text-7xl text-white/90 select-none">
                {p.title.charAt(0)}
              </span>
            </div>
            <div className="p-6 md:p-7 flex-grow flex flex-col">
              <span className="text-xs font-medium text-ember uppercase tracking-wide mb-2">{p.category}</span>
              <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-mist leading-relaxed mb-6 flex-grow">{p.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-ember transition-colors">
                View Project <ArrowUpRight size={16} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSlide;
