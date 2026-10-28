import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, ShoppingBag, Workflow, Globe2 } from 'lucide-react';
import Button from '../ui/Button';

const CAPABILITIES = [
  { icon: Globe2, label: 'Websites', detail: 'Digital presence that earns trust' },
  { icon: Code2, label: 'Web applications', detail: 'Tools built around your workflow' },
  { icon: ShoppingBag, label: 'E-commerce', detail: 'Better ways to sell online' },
  { icon: Workflow, label: 'Business systems', detail: 'Connected, practical software' },
];

const HeroSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-14 py-6 md:py-12">
      <div className="lg:col-span-7 text-center lg:text-left">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-5 justify-center lg:justify-start flex">
          Independent digital studio · Kenya & beyond
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6 leading-[1.04] tracking-tight text-bone">
          We turn business ideas into <span className="text-ember">digital products.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="text-lg md:text-xl text-mist mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          SmartBiz designs and builds websites, e-commerce experiences and business software that help teams work smarter and businesses grow.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
          <Button href="/contact" className="w-full sm:w-auto">Start a Project <ArrowUpRight size={17} /></Button>
          <Button href="/work" variant="outline-dark" className="w-full sm:w-auto">Explore Our Work</Button>
        </motion.div>
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-7 border-t border-white/10">
          {['Strategy', 'Design', 'Development', 'Launch & support'].map((item, i) => (
            <span key={item} className={`text-sm text-mist ${i > 0 ? 'pl-6 border-l border-white/10' : ''}`}>{item}</span>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5" aria-label="SmartBiz digital capabilities">
        <div className="relative border border-white/10 rounded-md bg-surface overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-surface-2/40">
            <span className="text-xs uppercase tracking-[0.15em] text-mist">What we build</span>
            <span className="text-xs text-ember">01 — 04</span>
          </div>
          <div className="p-3 sm:p-4">
            {CAPABILITIES.map(({ icon: Icon, label, detail }, index) => (
              <div key={label} className="group flex items-center gap-4 p-4 border-b last:border-b-0 border-white/[0.07] hover:bg-white/[0.025] transition-colors">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center border border-white/10 rounded-md text-ember"><Icon size={20} strokeWidth={1.5} /></div>
                <div className="min-w-0 flex-1"><h2 className="text-sm sm:text-base font-medium text-bone">{label}</h2><p className="text-xs sm:text-sm text-mist mt-1">{detail}</p></div>
                <span className="text-xs text-mist/40 group-hover:text-ember transition-colors">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-mist">From first idea to launch</span>
            <a href="/services" className="inline-flex items-center gap-1.5 text-xs text-bone hover:text-ember transition-colors">Explore services <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <p className="mt-4 text-xs text-mist/60 text-center lg:text-left">Thoughtful design. Useful technology. Built around your business.</p>
      </motion.div>
    </div>
  </div>
);

export default HeroSlide;
