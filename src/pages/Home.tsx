import { ArrowUpRight, BarChart3, CheckCircle2, Code2, MonitorSmartphone, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Layout from './Layout';

const services = [
  { number: '01', title: 'Websites & digital experiences', description: 'Fast, clear websites that make your business easier to find, trust and choose.', tags: 'WEB DESIGN · E-COMMERCE · SEO', Icon: MonitorSmartphone, accent: 'bg-lime-300' },
  { number: '02', title: 'Business systems & platforms', description: 'Purpose-built software that streamlines operations and gives your team better visibility.', tags: 'POS · MARKETPLACES · DASHBOARDS', Icon: Code2, accent: 'bg-blue-300' },
  { number: '03', title: 'Automation & AI', description: 'Reduce repetitive work and create smarter workflows with useful, human-centred automation.', tags: 'INTEGRATIONS · AI WORKFLOWS · APIS', Icon: Sparkles, accent: 'bg-violet-300' },
];

const projects = [
  { name: 'MaliHub', category: 'Marketplace platform', description: 'A Kenyan marketplace built around discovery, seller trust and simpler shopping.', tag: 'COMMERCE', href: 'https://malihub.smartbiz365.site/', tone: 'bg-lime-100', symbol: 'M' },
  { name: 'ZenPOS', category: 'Business operations', description: 'A flexible point-of-sale experience for teams that need connected operations.', tag: 'SAAS', href: 'https://zenpos.co.ke/', tone: 'bg-blue-100', symbol: 'Z' },
  { name: 'SecureSight', category: 'Service experience', description: 'A clearer path from security enquiries to trusted CCTV installation services.', tag: 'SERVICES', href: 'https://securesight.smartbiz365.site/', tone: 'bg-violet-100', symbol: 'S' },
];

const steps = [
  ['01', 'Understand', 'We start with your goals, users and the problem worth solving.'],
  ['02', 'Plan & design', 'We map the right solution and make the experience clear.'],
  ['03', 'Build & refine', 'We develop, test and improve with your feedback.'],
  ['04', 'Launch & support', 'We help you go live and keep moving forward.'],
];

function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className={`mb-4 inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] ${dark ? 'bg-white/10 text-lime-300' : 'bg-lime-100 text-lime-900'}`}>{eyebrow}</span>
        <h2 className={`font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px] ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      </div>
      {description && <p className={`max-w-sm text-sm leading-relaxed md:text-base ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>}
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export default function Home() {
  return (
    <Layout>
      <SEO title="SmartBiz365 | Websites, Business Systems & Automation in Kenya" description="SmartBiz365 builds thoughtful websites, business systems and practical automation to help Kenyan businesses work better and grow with confidence." path="/" />
      <main className="bg-[#f6f7f4] text-slate-900">
        <section id="home" className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-36 lg:px-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-[430px] w-[430px] rounded-full bg-lime-200/35 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <Reveal className="max-w-xl">
              <span className="mb-6 inline-flex rounded-full bg-lime-100 px-3.5 py-2 text-[10px] font-bold tracking-[0.13em] text-lime-900">DIGITAL PARTNER FOR AMBITIOUS TEAMS</span>
              <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-6xl lg:text-[68px]">Make your next move a <span className="relative inline-block">smarter one<span className="absolute -bottom-1 left-0 -z-0 h-2 w-full rounded-full bg-lime-300/80" /></span>.</h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">We build websites, business systems and practical automation that help ambitious businesses work better and grow with confidence.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-3 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-lime-200">Let’s talk <ArrowUpRight size={17} /></Link>
                <Link to="/work" className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400">Explore our work <ArrowUpRight size={17} /></Link>
              </div>
              <div className="mt-7 flex items-center gap-3 text-xs font-medium text-slate-500"><span className="flex -space-x-1.5"><span className="h-6 w-6 rounded-full border-2 border-[#f6f7f4] bg-lime-300" /><span className="h-6 w-6 rounded-full border-2 border-[#f6f7f4] bg-blue-400" /><span className="h-6 w-6 rounded-full border-2 border-[#f6f7f4] bg-violet-400" /></span>Built with purpose. Designed for growth.</div>
            </Reveal>
            <Reveal delay={0.12} className="relative mx-auto w-full max-w-[590px]">
              <div className="rounded-[26px] bg-[#142035] p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
                <div className="mb-4 flex items-center justify-between px-1 text-[10px] font-bold tracking-[0.12em] text-slate-300"><span>SMARTBIZ / OVERVIEW</span><span className="rounded-full bg-lime-300 px-3 py-1 text-[9px] tracking-normal text-slate-900">LIVE</span></div>
                <div className="rounded-2xl bg-white p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-2"><h2 className="text-sm font-bold text-slate-900">Business snapshot</h2><span className="rounded-full bg-lime-100 px-3 py-1 text-[10px] font-bold text-lime-900">↗ +28.4%</span></div>
                  <div className="grid grid-cols-3 gap-2">
                    {[['Revenue', 'KES 248k', 'bg-lime-100'], ['Orders', '1,284', 'bg-blue-100'], ['Efficiency', '92%', 'bg-violet-100']].map(([label, value, tone]) => <div key={label} className={`rounded-xl p-3 ${tone}`}><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{value}</p></div>)}
                  </div>
                </div>
                <div className="mt-3 rounded-2xl bg-[#202d43] p-4">
                  <div className="mb-4 flex items-center justify-between text-[10px]"><span className="text-slate-300">Performance over time</span><span className="font-bold text-lime-300">+18.6% this month</span></div>
                  <div className="flex h-20 items-end gap-2" aria-label="Illustrative business performance chart">{[24, 35, 28, 45, 38, 58, 52, 68, 56, 70, 66, 80].map((height, i) => <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.035 }} className={`min-w-0 flex-1 rounded-t-md ${i > 8 ? 'bg-lime-300' : 'bg-slate-500'}`} />)}</div>
                </div>
                <div className="mt-3 flex items-center gap-2 px-1 text-[10px] text-slate-400"><BarChart3 size={13} /> Illustrative dashboard concept</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs font-semibold text-slate-600">
            <span className="text-[10px] font-bold tracking-[0.12em] text-slate-400">A PARTNER FOR THE WHOLE JOURNEY</span><span className="hidden h-px w-8 bg-slate-200 lg:block" /><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-lime-700" /> Strategy that makes sense</span><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-lime-700" /> Technology that works</span><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-lime-700" /> Support beyond launch</span>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="WHAT WE DO" title="Practical technology. Meaningful progress." description="From the first idea to the day-to-day details, we create digital tools that solve real business problems." />
            <div className="grid gap-4 md:grid-cols-3">{services.map(({ number, title, description, tags, Icon, accent }, i) => <Reveal key={number} delay={i * 0.06}><article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"><div className="mb-6 flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}><Icon size={19} /></span><span className="text-sm font-bold text-slate-400">{number}</span></div><h3 className="text-xl font-bold leading-snug text-slate-900">{title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p><div className="mt-6 border-t border-slate-100 pt-4 text-[10px] font-bold tracking-[0.08em] text-lime-900">{tags}</div></article></Reveal>)}</div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 bg-[#142035] px-5 py-20 text-white sm:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="SELECTED WORK" title="Made for the real world." description="Thoughtful digital products that help real businesses move forward." dark />
            <div className="grid gap-4 lg:grid-cols-3">{projects.map((project, i) => <Reveal key={project.name} delay={i * 0.07}><article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09]"><div className={`flex min-h-40 items-center justify-between p-6 ${project.tone}`}><span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-900">{project.tag}</span><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-4xl font-black text-slate-800 shadow-sm">{project.symbol}</div><ArrowUpRight className="text-slate-900 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div className="p-6"><p className="text-[10px] font-bold tracking-[0.12em] text-lime-300">{project.category.toUpperCase()}</p><h3 className="mt-2 text-2xl font-bold">{project.name}</h3><p className="mt-3 min-h-12 text-sm leading-relaxed text-slate-300">{project.description}</p><a href={project.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-lime-300">Explore project <ArrowUpRight size={16} /></a></div></article></Reveal>)}</div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 px-5 py-20 sm:px-8 md:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl"><SectionHeading eyebrow="HOW WE WORK" title="Clear steps. No mystery." description="Good work comes from shared understanding, honest communication and steady progress." />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{steps.map(([number, title, description], i) => <Reveal key={number} delay={i * 0.05}><article className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200"><span className="text-xs font-black tracking-wider text-lime-800">{number}</span><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p></article></Reveal>)}</div>
          </div>
        </section>

        <section id="contact" className="bg-lime-300 px-5 py-12 sm:px-8 md:py-16 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-3xl bg-[#101a2b] p-7 text-white sm:p-10 md:flex-row md:items-center"><div className="max-w-2xl"><p className="text-[10px] font-bold tracking-[0.14em] text-lime-300">HAVE A GOOD IDEA? LET’S MAKE IT REAL.</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your next chapter starts here.</h2><p className="mt-3 text-sm leading-relaxed text-slate-300">Tell us what you’re trying to improve. We’ll help you find the right next step.</p></div><Link to="/contact" className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-lime-200">Start a conversation <ArrowUpRight size={17} /></Link></div>
        </section>
      </main>
    </Layout>
  );
}
