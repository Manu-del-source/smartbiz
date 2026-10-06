import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/smartbiz-logo.png';
import { CONTACT } from '../lib/contact';

const FOOTER_NAV = [
  ['/services', 'Services'], ['/work', 'Work'], ['/about', 'About'],
  ['/process', 'Process'], ['/pricing', 'Pricing'], ['/faq', 'FAQ'], ['/contact', 'Contact'],
];

const Footer: React.FC = () => (
  <footer className="relative bg-ink border-t border-white/10">
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
      <div className="space-y-4 sm:col-span-2 md:col-span-1">
        <Link to="/" aria-label="SmartBiz homepage"><img src={logo} alt="SmartBiz logo" width={483} height={311} loading="lazy" className="h-8 w-auto" /></Link>
        <p className="text-mist text-sm leading-relaxed max-w-xs">We design and build websites, online stores, and custom software for businesses in Kenya.</p>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-bone mb-5">Explore SmartBiz</h2>
        <ul className="space-y-3 text-sm text-mist">
          {FOOTER_NAV.map(([to,label]) => <li key={to}><Link to={to} className="hover:text-bone transition-colors">{label}</Link></li>)}
        </ul>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-bone mb-5">Services</h2>
        <ul className="space-y-3 text-sm text-mist">
          <li><Link to="/services" className="hover:text-bone">Business Websites</Link></li>
          <li><Link to="/services" className="hover:text-bone">E-commerce</Link></li>
          <li><Link to="/services" className="hover:text-bone">Web Applications</Link></li>
          <li><Link to="/services" className="hover:text-bone">Business Systems</Link></li>
        </ul>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-bone mb-5">Contact</h2>
        <ul className="space-y-3 text-sm text-mist">
          <li><a href={`mailto:${CONTACT.email}`} className="hover:text-bone">{CONTACT.email}</a></li>
          <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-bone">{CONTACT.phoneDisplay}</a></li>
          <li>{CONTACT.location}</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 border-t border-white/5 text-center text-xs text-mist">© {new Date().getFullYear()} SmartBiz. All rights reserved.</div>
  </footer>
);

export default Footer;
