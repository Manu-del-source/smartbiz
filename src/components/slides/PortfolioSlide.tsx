import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

// A real captured screenshot with its native pixel dimensions, so the
// container can be given an exact aspect-ratio (no crop, no layout shift).
interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

// `desktop` is intentionally optional: a project can ship with a mobile
// screenshot only, and a desktop capture can be added later just by
// filling this field in — no component changes required.
interface ProjectImages {
  mobile: ProjectImage;
  desktop?: ProjectImage;
}

const PROJECTS: {
  title: string;
  category: string;
  desc: string;
  link: string;
  from: string;
  to: string;
  images?: ProjectImages;
}[] = [
  {
    title: 'Savory Kitchen',
    category: 'Food & Beverage',
    desc: 'Restaurant website focused on menu discovery, online enquiries and a mobile-friendly ordering experience.',
    link: 'https://poppies.vercel.app/#specials',
    from: '#8a3b1f',
    to: '#c65a2c',
    images: { mobile: { src: '/portfolio/poppies/mobile.jpg', width: 703, height: 1429 } },
  },
  {
    title: 'StreetWear KE',
    category: 'Fashion & Retail',
    desc: 'E-commerce website for a fashion brand, with product discovery and WhatsApp-based ordering designed for mobile shoppers.',
    link: 'https://verdant-blancmange-e5ed85.netlify.app/',
    from: '#1b1f24',
    to: '#3a4048',
    images: { mobile: { src: '/portfolio/streetwear-ke/mobile.jpg', width: 720, height: 1361 } },
  },
  {
    title: 'Lumina Events',
    category: 'Entertainment & Events',
    desc: 'Event website designed to showcase upcoming experiences, provide essential event information and encourage ticket enquiries.',
    link: 'https://lumina-rosy.vercel.app/',
    from: '#33204f',
    to: '#5c3a82',
    // No screenshot captured yet — falls back to the monogram treatment below.
  },
  {
    title: 'Rift Valley House',
    category: 'Hospitality & Tourism',
    desc: 'Boutique hotel website showcasing the retreat\'s accommodations and experiences, with enquiry channels for guests planning a stay.',
    link: 'https://rift-valley-house.vercel.app',
    from: '#1d3a2f',
    to: '#3f6b52',
    images: { mobile: { src: '/portfolio/rift-valley-house/mobile.jpg', width: 720, height: 1421 } },
  },
  {
    title: 'Sains Restaurant',
    category: 'Food & Beverage',
    desc: 'Flame-grilled restaurant website for an Eldoret kitchen, built to showcase the menu and convert visitors into table bookings and WhatsApp orders.',
    link: 'https://sains-restaurant.vercel.app',
    from: '#5c1f16',
    to: '#9c3a1f',
    images: { mobile: { src: '/portfolio/sains-restaurant/mobile.jpg', width: 720, height: 1428 } },
  },
  {
    title: 'Kahawa House',
    category: 'Café & Coffee',
    desc: 'Café website for a Kenyan coffee house, presenting its story, menu and atmosphere to welcome walk-ins and enquiries.',
    link: 'https://kahawa-house.vercel.app',
    from: '#3b2a1a',
    to: '#6f4e2e',
    images: { mobile: { src: '/portfolio/kahawa-house/mobile.jpg', width: 720, height: 1419 } },
  },
];

type Project = (typeof PROJECTS)[number];

/** Visual side of a portfolio row: a real screenshot in a contained frame
 * when one exists, otherwise the original gradient + monogram treatment. */
const ProjectVisual: React.FC<{ project: Project; order: string }> = ({ project: p, order }) => {
  const gradient = `linear-gradient(135deg, rgba(0,0,0,.4), rgba(0,0,0,.15)), linear-gradient(135deg, ${p.from}, ${p.to})`;

  if (!p.images) {
    return (
      <div
        className={`relative h-64 md:h-96 rounded-md overflow-hidden flex items-center justify-center border border-white/10 ${order}`}
        style={{ background: gradient }}
      >
        <span className="font-display font-medium text-7xl md:text-8xl text-bone/80 select-none">{p.title.charAt(0)}</span>
      </div>
    );
  }

  const { mobile, desktop } = p.images;
  const altText = `${p.title} mobile website homepage`;

  return (
    <div
      className={`relative rounded-md overflow-hidden flex items-center justify-center border border-white/10 p-4 md:p-6 min-h-64 md:min-h-96 ${order}`}
      style={{ background: gradient }}
    >
      {desktop ? (
        <>
          <div
            className="w-full max-w-[240px] mx-auto md:hidden rounded-lg overflow-hidden border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,.55)]"
            style={{ aspectRatio: `${mobile.width} / ${mobile.height}` }}
          >
            <img src={mobile.src} width={mobile.width} height={mobile.height} loading="lazy" alt={altText} className="w-full h-full object-cover" />
          </div>
          <div
            className="hidden md:block w-full rounded-lg overflow-hidden border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,.55)]"
            style={{ aspectRatio: `${desktop.width} / ${desktop.height}` }}
          >
            <img
              src={desktop.src}
              width={desktop.width}
              height={desktop.height}
              loading="lazy"
              alt={`${p.title} desktop website homepage`}
              className="w-full h-full object-cover"
            />
          </div>
        </>
      ) : (
        <div
          className="w-full max-w-[240px] sm:max-w-[260px] mx-auto rounded-lg overflow-hidden border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,.55)]"
          style={{ aspectRatio: `${mobile.width} / ${mobile.height}` }}
        >
          <img src={mobile.src} width={mobile.width} height={mobile.height} loading="lazy" alt={altText} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

const PortfolioSlide: React.FC = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <SectionHeading
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
              <ProjectVisual project={p} order={desktopOrder} />
              <div className={i % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                <span className="eyebrow mb-3 inline-block">{p.category}</span>
                <h3 className="font-display font-medium text-2xl md:text-3xl text-bone mb-3 tracking-tight">{p.title}</h3>
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
