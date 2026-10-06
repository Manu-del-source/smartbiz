import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';

const CAPABILITIES = ['Websites', 'Web Apps', 'E-commerce', 'Business Systems'];

// The hero's centerpiece is a real, shipped SmartBiz project rather than a
// fabricated dashboard or generic device mockup. Same honest gradient +
// monogram treatment used across the Selected Work section — no invented
// screenshot, no invented numbers.
const FEATURED_PROJECT = {
  title: 'Sains Restaurant',
  category: 'Food & Beverage',
  domain: 'sains-restaurant.vercel.app',
  link: 'https://sains-restaurant.vercel.app',
  from: '#5c1f16',
  to: '#9c3a1f',
};

const HeroSlide: React.FC = () => {
  return (
    <div className="container mx-auto px-5 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-y-10 lg:gap-x-12 py-6 md:py-10">
        {/* LEFT — headline, copy, CTAs */}
        <div className="lg:col-span-6 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5 justify-center lg:justify-start flex"
          >
            Web design &amp; development — Eldoret, Kenya
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold mb-6 leading-[1.08] tracking-tight text-bone"
          >
            Websites built to make your business look serious.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="text-lg text-mist mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            SmartBiz designs and develops modern websites that help businesses attract
            customers, build trust, and grow online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
          >
            <Button href="/contact" className="w-full sm:w-auto">
              Start a Project →
            </Button>
            <Button href="/work" variant="outline-dark" className="w-full sm:w-auto">
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-8 border-t border-white/10"
          >
            {CAPABILITIES.map((c, i) => (
              <span key={c} className={`text-sm text-mist ${i > 0 ? 'pl-6 border-l border-white/10' : ''}`}>
                {c}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — one large, real featured project as the visual centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <a
            href={FEATURED_PROJECT.link}
            target="_blank"
            rel="noreferrer"
            className="group block border border-white/10 rounded-md overflow-hidden bg-surface hover:border-white/20 transition-colors"
          >
            <div className="h-9 flex items-center gap-3 px-4 border-b border-white/10 bg-surface-2/40">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
              </div>
              <span className="text-[11px] text-mist/80 bg-white/[0.04] border border-white/10 rounded px-2.5 py-0.5 truncate">
                {FEATURED_PROJECT.domain}
              </span>
            </div>
            <div
              className="h-72 sm:h-80 lg:h-96 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgba(0,0,0,.4), rgba(0,0,0,.15)), linear-gradient(135deg, ${FEATURED_PROJECT.from}, ${FEATURED_PROJECT.to})`,
              }}
            >
              <span className="font-display font-medium text-8xl text-bone/80 select-none">
                {FEATURED_PROJECT.title.charAt(0)}
              </span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-bone">{FEATURED_PROJECT.title}</p>
                <p className="text-xs text-mist mt-0.5">{FEATURED_PROJECT.category}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mist group-hover:text-ember transition-colors">
                Featured project <ArrowUpRight size={14} />
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSlide;
