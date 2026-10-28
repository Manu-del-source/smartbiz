import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/smartbiz-logo.png';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/pricing', label: 'Project Planning' },
  { to: '/faq', label: 'FAQ' },
];

export default function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = (to: string) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header className={`fixed left-0 top-0 z-[100] w-full border-b transition-all duration-300 ${scrolled ? 'border-slate-200 bg-[#f6f7f4]/95 shadow-sm shadow-slate-900/5 backdrop-blur-md' : 'border-transparent bg-[#f6f7f4]/85 backdrop-blur-sm'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link to="/" className="flex items-center" aria-label="SmartBiz365 homepage">
          <img src={logo} alt="SmartBiz365 logo" width={483} height={311} className="h-7 w-auto md:h-8" fetchPriority="high" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {LINKS.filter(link => link.to !== '/').map(link => (
            <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors ${active(link.to) ? 'text-lime-800' : 'text-slate-600 hover:text-slate-950'}`}>{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden items-center gap-2 rounded-xl bg-lime-300 px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-lime-200 sm:inline-flex">Start a project <span aria-hidden="true">↗</span></Link>
          <button className="rounded-lg p-1 text-slate-800 transition-transform duration-200 active:scale-95 motion-reduce:transform-none lg:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div key="mobile-navigation" initial={reduceMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[-1] bg-[#f6f7f4] pt-28 lg:hidden">
            <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
              {LINKS.map((link, index) => (
                <motion.div key={link.to} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.025 * index }}>
                  <Link to={link.to} onClick={() => setOpen(false)} className={`font-display text-2xl font-medium transition-colors ${active(link.to) ? 'text-lime-800' : 'text-slate-900 hover:text-lime-800'}`}>{link.label}</Link>
                </motion.div>
              ))}
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.18 }}>
                <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-lime-300 px-8 py-4 text-base font-bold text-slate-900">Start a project <span aria-hidden="true">↗</span></Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
