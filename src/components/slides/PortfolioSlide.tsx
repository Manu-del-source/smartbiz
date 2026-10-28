import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  desc: string;
  role: string;
  link: string;
  accent: string;
  status?: string;
}

const PROJECTS: Project[] = [
  { title: 'MaliHub Kenya', category: 'Marketplace & E-commerce', desc: 'A Kenya-focused marketplace connecting buyers and sellers, with product discovery, seller onboarding and dedicated buyer and seller workflows.', role: 'Product design · Full-stack development', link: 'https://malihub.smartbiz365.site/', accent: '#73b9a8', status: 'Live product' },
  { title: 'Poppies', category: 'Food & Beverage', desc: 'A restaurant website focused on menu discovery, online enquiries and a mobile-friendly ordering experience.', role: 'Website design · Development', link: 'https://poppies.vercel.app/#specials', accent: '#c65a2c', status: 'Live website' },
  { title: 'StreetWear KE', category: 'Fashion & Retail', desc: 'A fashion e-commerce experience with product discovery and WhatsApp-based ordering for mobile shoppers.', role: 'Website design · Development', link: 'https://verdant-blancmange-e5ed85.netlify.app/', accent: '#9aa6b2', status: 'Live website' },
  { title: 'Rift Valley House', category: 'Hospitality & Tourism', desc: 'A boutique hospitality website showcasing accommodation and guest experiences, with enquiry channels for planning a stay.', role: 'Website design · Development', link: 'https://rift-valley-house.vercel.app', accent: '#78a58b', status: 'Live website' },
  { title: 'Sains Restaurant', category: 'Food & Beverage', desc: 'A restaurant website presenting the menu and helping visitors make table-booking and WhatsApp-order enquiries.', role: 'Website design · Development', link: 'https://sains-restaurant.vercel.app', accent: '#df805e', status: 'Live website' },
  { title: 'Kahawa House', category: 'Café & Coffee', desc: 'A café website presenting the brand story, menu and atmosphere to welcome walk-ins and enquiries.', role: 'Website design · Development', link: 'https://kahawa-house.vercel.app', accent: '#bd9868', status: 'Live website' },
  { title: 'Lumina Events', category: 'Entertainment & Events', desc: 'An event website designed to showcase experiences, share event information and encourage enquiries.', role: 'Website design · Development', link: 'https://lumina-rosy.vercel.app/', accent: '#b6a0e5', status: 'Live website' },
];

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const PortfolioSlide: React.FC = () => (
  <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <p className="eyebrow mb-4 uppercase">Selected work · 2026</p>
      <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-bone sm:text-4xl lg:text-5xl">A mix of client websites and digital products.</h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg">From online stores and hospitality websites to a full marketplace, each project is designed around a real business need. Open a project to explore it live.</p>
    </Reveal>

    <div className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2 xl:grid-cols-3">
      {PROJECTS.map((project, index) => {
        const featured = index === 0;
        return (
          <Reveal key={project.title} delay={featured ? 0 : (index % 3) * 0.06} className={`h-full ${featured ? 'sm:col-span-2' : ''}`}>
            <article className={`group flex h-full flex-col border-b border-r border-white/10 p-6 transition-[background-color,transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.035] motion-reduce:transform-none sm:p-7 md:p-8 ${featured ? 'relative overflow-hidden bg-surface-2/30 md:p-10' : ''}`}>
              <div className="mb-8 flex items-start justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-mist/60">{featured ? 'Featured digital product' : `Project ${String(index).padStart(2, '0')}`}</span>
                <span className="rounded border border-white/10 px-2.5 py-1 text-xs text-mist">{project.status}</span>
              </div>

              <div className={`mb-7 flex min-h-28 items-end ${featured ? 'md:min-h-40' : ''}`}>
                <div className="w-full border-l-2 py-2 pl-5" style={{ borderColor: project.accent }}>
                  <p className="mb-3 text-xs uppercase tracking-[0.15em] text-mist">{project.category}</p>
                  <h3 className={`font-display leading-tight tracking-tight text-bone transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none ${featured ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl'}`}>{project.title}</h3>
                </div>
              </div>

              <p className={`mb-5 max-w-xl leading-relaxed text-mist ${featured ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{project.desc}</p>
              <p className="mb-7 text-xs uppercase tracking-[0.1em] text-mist/70">{project.role}</p>

              <a href={project.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-bone transition-colors hover:text-ember" aria-label={`Explore the live ${project.title} project in a new tab`}>
                Explore project <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
              </a>
            </article>
          </Reveal>
        );
      })}
    </div>

    <Reveal className="pb-4 pt-16 text-center md:pb-6 md:pt-20">
      <h3 className="mb-3 font-display text-2xl font-medium tracking-tight text-bone md:text-3xl">Have a project in mind?</h3>
      <p className="mb-8 text-base text-mist">Tell us what you want to build. We’ll help you map the next step.</p>
      <a href="/contact" className="btn-primary">Start a project <ExternalLink size={16} /></a>
    </Reveal>
  </div>
);

export default PortfolioSlide;
