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
  { title: 'Poppies', category: 'Food & Beverage', desc: 'Restaurant website focused on menu discovery, online enquiries and a mobile-friendly ordering experience.', role: 'Website design · Development', link: 'https://poppies.vercel.app/#specials', accent: '#c65a2c', status: 'Live website' },
  { title: 'StreetWear KE', category: 'Fashion & Retail', desc: 'Fashion e-commerce experience with product discovery and WhatsApp-based ordering designed for mobile shoppers.', role: 'Website design · Development', link: 'https://verdant-blancmange-e5ed85.netlify.app/', accent: '#9aa6b2', status: 'Live website' },
  { title: 'Rift Valley House', category: 'Hospitality & Tourism', desc: 'Boutique hotel website showcasing accommodations and experiences, with enquiry channels for guests planning a stay.', role: 'Website design · Development', link: 'https://rift-valley-house.vercel.app', accent: '#78a58b', status: 'Live website' },
  { title: 'Sains Restaurant', category: 'Food & Beverage', desc: 'Restaurant website built to showcase the menu and help visitors make table-booking and WhatsApp-order enquiries.', role: 'Website design · Development', link: 'https://sains-restaurant.vercel.app', accent: '#df805e', status: 'Live website' },
  { title: 'Kahawa House', category: 'Café & Coffee', desc: 'Café website presenting the brand story, menu and atmosphere to welcome walk-ins and enquiries.', role: 'Website design · Development', link: 'https://kahawa-house.vercel.app', accent: '#bd9868', status: 'Live website' },
  { title: 'MaliHub Kenya', category: 'Marketplace & E-commerce', desc: 'Kenya-focused marketplace connecting buyers and sellers, with product discovery, seller onboarding and buyer and seller workflows.', role: 'Product design · Full-stack development', link: 'https://malihub.smartbiz365.site/', accent: '#73b9a8', status: 'Live product' },
  { title: 'Lumina Events', category: 'Entertainment & Events', desc: 'Event website designed to showcase experiences, provide event information and encourage ticket enquiries.', role: 'Website design · Development', link: 'https://lumina-rosy.vercel.app/', accent: '#b6a0e5', status: 'Live website' },
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
    <Reveal className="max-w-3xl mb-12 md:mb-16">
      <p className="eyebrow uppercase mb-4">Selected work · 2026</p>
      <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-bone">Real projects. Practical digital experiences.</h2>
      <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-mist">A selection of SmartBiz work across hospitality, retail, e-commerce and software. Explore the live projects to see each experience directly.</p>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10">
      {PROJECTS.map((project, index) => (
        <Reveal key={project.title} delay={index % 2 === 0 ? 0 : 0.08} className="h-full">
          <article className="group h-full flex flex-col p-6 sm:p-8 md:p-9 border-r border-b border-white/10 hover:bg-white/[0.025] transition-colors">
            <div className="flex items-start justify-between gap-4 mb-10">
              <span className="text-xs uppercase tracking-[0.14em] text-mist/60">{String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
              <span className="text-xs text-mist border border-white/10 rounded px-2.5 py-1">{project.status}</span>
            </div>
            <div className="mb-8 min-h-32 sm:min-h-36 flex items-end">
              <div className="w-full border-l-2 pl-5 py-2" style={{ borderColor: project.accent }}>
                <p className="text-xs uppercase tracking-[0.15em] text-mist mb-3">{project.category}</p>
                <h3 className="font-display text-3xl sm:text-4xl text-bone leading-tight tracking-tight">{project.title}</h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-mist leading-relaxed mb-5 max-w-xl">{project.desc}</p>
            <p className="text-xs uppercase tracking-[0.1em] text-mist/70 mb-7">{project.role}</p>
            <a href={project.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-bone hover:text-ember transition-colors" aria-label={`Open the live ${project.title} project in a new tab`}>
              Explore project <ArrowUpRight size={16} />
            </a>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal className="pt-16 md:pt-20 pb-4 md:pb-6 text-center">
      <h3 className="font-display font-medium text-2xl md:text-3xl text-bone mb-3 tracking-tight">Have a project in mind?</h3>
      <p className="text-base text-mist mb-8">Tell us what you want to build. We'll help you map the next step.</p>
      <a href="/contact" className="btn-primary">Start a project <ExternalLink size={16} /></a>
    </Reveal>
  </div>
);

export default PortfolioSlide;
