import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/smartbiz-logo.png';
import { CONTACT } from '../lib/contact';

const FOOTER_NAV = [
  ['/services', 'Services'], ['/work', 'Our work'], ['/about', 'About'],
  ['/process', 'Our approach'], ['/pricing', 'Project planning'], ['/faq', 'FAQ'], ['/contact', 'Contact'],
];

const Footer: React.FC = () => (
  <footer className="border-t border-slate-200 bg-[#f6f7f4] text-slate-900">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 md:gap-12 md:px-10 md:py-16">
      <div className="space-y-4 sm:col-span-2 md:col-span-1">
        <Link to="/" aria-label="SmartBiz365 homepage"><img src={logo} alt="SmartBiz365 logo" width={483} height={311} loading="lazy" className="h-8 w-auto" /></Link>
        <p className="max-w-xs text-sm leading-relaxed text-slate-600">Digital experiences and systems for businesses ready to grow.</p>
      </div>
      <div>
        <h2 className="mb-4 text-[10px] font-bold tracking-[0.13em] text-slate-500">EXPLORE</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          {FOOTER_NAV.map(([to, label]) => <li key={to}><Link to={to} className="transition-colors hover:text-slate-950">{label}</Link></li>)}
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-[10px] font-bold tracking-[0.13em] text-slate-500">SERVICES</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li><Link to="/services" className="transition-colors hover:text-slate-950">Business websites</Link></li>
          <li><Link to="/services" className="transition-colors hover:text-slate-950">E-commerce</Link></li>
          <li><Link to="/services" className="transition-colors hover:text-slate-950">Business systems</Link></li>
          <li><Link to="/services" className="transition-colors hover:text-slate-950">Automation & AI</Link></li>
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-[10px] font-bold tracking-[0.13em] text-slate-500">LET’S CONNECT</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li><a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-slate-950">{CONTACT.email}</a></li>
          <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-950">{CONTACT.phoneDisplay}</a></li>
          <li>{CONTACT.location}</li>
          <li><a href="https://github.com/Manu-del-source/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-slate-950">GitHub profile <ArrowUpRight size={14} /></a></li>
        </ul>
      </div>
    </div>
    <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-slate-200 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between md:px-10">
      <span>© {new Date().getFullYear()} SmartBiz365. Built with purpose.</span>
      <span>Kenya · Working with teams everywhere</span>
    </div>
  </footer>
);

export default Footer;
