import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const PROJECTS = [
  {
    title: 'Savory Kitchen',
    category: 'Food & Beverage',
    desc: 'Restaurant website focused on menu discovery, online enquiries and a mobile-friendly ordering experience.',
    link: 'https://poppies.vercel.app/#specials',
    from: '#8a3b1f',
    to: '#c65a2c',
  },
  {
    title: 'StreetWear KE',
    category: 'Fashion & Retail',
    desc: 'E-commerce website for a fashion brand, with product discovery and WhatsApp-based ordering designed for mobile shoppers.',
    link: 'https://verdant-blancmange-e5ed85.netlify.app/',
    from: '#1b1f24',
    to: '#3a4048',
  },
  {
    title: 'Lumina Events',
    category: 'Entertainment & Events',
    desc: 'Event website designed to showcase upcoming experiences, provide essential event information and encourage ticket enquiries.',
    link: 'https://lumina-rosy.vercel.app/',
    from: '#33204f',
    to: '#5c3a82',
  },
  {
    title: 'Rift Valley House',
    category: 'Hospitality & Tourism',
    desc: 'Boutique hotel website showcasing the retreat\'s accommodations and experiences, with enquiry channels for guests planning a stay.',
    link: 'https://rift-valley-house.vercel.app',
    from: '#1d3a2f',
    to: '#3f6b52',
  },
  {
    title: 'Sains Restaurant',
    category: 'Food & Beverage',
    desc: 'Flame-grilled restaurant website for an Eldoret kitchen, built to showcase the menu and convert visitors into table bookings and WhatsApp orders.',
    link: 'https://sains-restaurant.vercel.app',
    from: '#5c1f16',
    to: '#9c3a1f',
  },
  {
    title: 'Kahawa House',
    category: 'Café & Coffee',
    desc: 'Café website for a Kenyan coffee house, presenting its story, menu and atmosphere to welcome walk-ins and enquiries.',
    link: 'https://kahawa-house.vercel.app',
    from: '#3b2a1a',
    to: '#6f4e2e',
  },
];

const PortfolioSlide: React.FC = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <SectionHeading
        eyebrow="Selected work"
        title="Real projects, shipped for real businesses."
        subtitle="A selection of websites we've designed and built across different industries — every link goes to the live site."
      />

      <div className="border-t border-white/10">
        {PROJECTS.map((p, i) => {
          const desktopOrder = i % 2 === 1 ? 'md:order-2' : 'md:order-1';
          return (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center py-10 md:py-12 border-b border-white/10"
            >
              <div
                className={`h-56 md:h-72 rounded-md overflow-hidden flex items-center justify-center border border-white/10 ${desktopOrder}`}
                style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
              >
                <span className="font-display text-7xl md:text-8xl text-bone/85 select-none">
                  {p.title.charAt(0)}
                </span>
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                <span className="eyebrow mb-3 inline-block">{p.category}</span>
                <h3 className="font-display text-2xl md:text-3xl text-bone mb-3 tracking-tight">{p.title}</h3>
                <p className="text-sm md:text-base text-mist leading-relaxed mb-6 max-w-md">{p.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-bone group-hover:text-ember transition-colors">
                  Visit live site <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioSlide;
