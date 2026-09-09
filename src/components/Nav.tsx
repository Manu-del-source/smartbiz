import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../lib/navigation';

// Every section on the page, used to drive the scroll-spy active state.
// FAQ and Contact are real sections but intentionally left out of primary nav (spec #4).
const ALL_SECTION_IDS = [...NAV_LINKS.map(l => l.id), 'faq', 'contact'];

const Nav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 200;
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-300 ${
          scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 md:py-5 px-5 md:px-10">
          <a
            href="#home"
            onClick={() => setIsMenuOpen(false)}
            className="font-display text-xl md:text-2xl font-semibold text-white tracking-tight"
          >
            SmartBiz
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id ? 'text-ember' : 'text-mist hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-primary py-2.5 px-6 text-sm hidden sm:inline-flex">
              Start a Project
            </a>
            <button
              className="md:hidden text-white p-1"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-ink flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <nav className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-display text-2xl ${activeSection === link.id ? 'text-ember' : 'text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="btn-primary px-10 py-4 text-base mt-2">
              Start a Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
