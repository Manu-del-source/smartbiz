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
    <header className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 md:py-5 px-5 md:px-10">
        <Link to="/" className="flex items-center" aria-label="SmartBiz homepage">
          <img src={logo} alt="SmartBiz logo" width={483} height={311} className="h-7 md:h-8 w-auto" fetchPriority="high" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors ${active(link.to) ? 'text-ember' : 'text-mist hover:text-bone'}`}>{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn-primary py-2.5 px-6 text-sm hidden sm:inline-flex">Start a Project</Link>
          <button className="lg:hidden text-bone p-1 transition-transform duration-200 active:scale-95 motion-reduce:transform-none" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[-1] bg-ink pt-28 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-7" aria-label="Mobile navigation">
              {LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.025 * index }}
                >
                  <Link to={link.to} onClick={() => setOpen(false)} className={`font-display font-medium text-2xl transition-colors duration-200 ${active(link.to) ? 'text-ember' : 'text-bone hover:text-ember'}`}>{link.label}</Link>
                </motion.div>
              ))}
              <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.18 }}>
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 px-10 py-4 text-base">Start a Project</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
