import React from 'react';
import logo from '../assets/smartbiz-logo.png';
import { CONTACT } from '../lib/contact';

const FOOTER_NAV = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'why', label: 'Why SmartBiz' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const FOOTER_SERVICES = ['Business Websites', 'E-commerce', 'Web Applications', 'Business Systems', 'SaaS Products'];

const Footer: React.FC = () => (
  <footer className="relative bg-ink border-t border-white/10">
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
      <div className="space-y-4 sm:col-span-2 md:col-span-1">
        <img src={logo} alt="SmartBiz" width={483} height={311} loading="lazy" className="h-8 w-auto" />
        <p className="text-mist text-sm leading-relaxed max-w-xs">
          We design and build websites, online stores, and custom software for businesses in Kenya.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-bone mb-5">Explore</h4>
        <ul className="space-y-3 text-sm text-mist">
          {FOOTER_NAV.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-bone transition-colors">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-bone mb-5">Services</h4>
        <ul className="space-y-3 text-sm text-mist">
          {FOOTER_SERVICES.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-bone mb-5">Contact</h4>
        <ul className="space-y-3 text-sm text-mist">
          <li>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-bone transition-colors">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a href={CONTACT.whatsappUrl} className="hover:text-bone transition-colors">
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>{CONTACT.location}</li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 border-t border-white/5 text-center text-xs text-mist">
      © {new Date().getFullYear()} SmartBiz. All rights reserved.
    </div>
  </footer>
);

export default Footer;
