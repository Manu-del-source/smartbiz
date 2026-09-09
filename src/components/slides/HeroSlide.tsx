import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const CAPABILITIES = ['Websites', 'Web Apps', 'E-commerce', 'Business Systems'];

// Abstract, labeled mockups rather than a fabricated dashboard with invented numbers.
const MOCKUPS = [
  { label: 'Business Website', blocks: [70, 45, 45], accent: false },
  { label: 'Online Store', blocks: [30, 30, 30], accent: true },
  { label: 'Business System', blocks: [100, 55, 40], accent: false },
];

const HeroSlide: React.FC = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-16 py-6 md:py-10">
      {/* LEFT */}
      <div className="text-center lg:text-left order-2 lg:order-1">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 leading-[1.1] tracking-tight text-white"
        >
          Websites and Digital Systems Built for Growing Businesses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg text-mist mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          SmartBiz designs and develops professional websites, e-commerce stores, web
          applications and custom business systems for businesses in Eldoret and across Kenya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
        >
          <Button href="#contact" className="w-full sm:w-auto">Start a Project</Button>
          <Button
            href="#work"
            variant="outline-dark"
            className="w-full sm:w-auto"
          >
            View Our Work
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-8 border-t border-white/10"
        >
          {CAPABILITIES.map((c, i) => (
            <span
              key={c}
              className={`text-sm text-mist ${i > 0 ? 'pl-6 border-l border-white/10' : ''}`}
            >
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — layered product-screen mockup, no invented metrics */}
      <div className="relative order-1 lg:order-2 h-[320px] sm:h-[380px] lg:h-[420px] mb-4 lg:mb-0">
        {MOCKUPS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: (i - 1) * 3.5 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 w-[240px] sm:w-[280px] md:w-[320px] -translate-x-1/2 -translate-y-1/2 bg-navy border border-white/10 rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.5)]"
            style={{ zIndex: i, marginLeft: (i - 1) * 70, marginTop: (i - 1) * -18 }}
          >
            <div className="h-7 bg-white/[0.04] flex items-center px-3 gap-1.5 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
            </div>
            <div className="p-4 space-y-2">
              {m.blocks.map((w, bi) => (
                <div
                  key={bi}
                  className="h-3 rounded-sm"
                  style={{
                    width: `${w}%`,
                    background: m.accent && bi === 0 ? 'var(--color-ember)' : 'rgba(255,255,255,.08)',
                  }}
                />
              ))}
              {m.accent && (
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[0, 1, 2].map((g) => (
                    <div key={g} className="aspect-square rounded-sm bg-white/[0.06]" />
                  ))}
                </div>
              )}
            </div>
            <div className="px-4 pb-3 text-[10px] uppercase tracking-wide text-mist">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlide;
