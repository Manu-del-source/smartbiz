import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// A real captured screenshot with its native pixel dimensions, so the
// container can be given an exact aspect-ratio (no crop, no layout shift,
// no stretching a portrait capture into a landscape frame).
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

type Layout = 'split-right' | 'split-left' | 'center' | 'wide' | 'offset' | 'minimal';

interface Project {
  title: string;
  category: string;
  desc: string;
  role: string;
  link: string;
  from: string;
  to: string;
  layout: Layout;
  images?: ProjectImages;
}

// Order is deliberate editorial pacing, not just data order: the one project
// without a real screenshot (Lumina Events) is placed last, so the sequence
// leads with five real, screenshot-backed case studies.
const PROJECTS: Project[] = [
  {
    title: 'Poppies',
    category: 'Food & Beverage',
    desc: 'Restaurant website focused on menu discovery, online enquiries and a mobile-friendly ordering experience.',
    role: 'Website Design · Development',
    link: 'https://poppies.vercel.app/#specials',
    from: '#8a3b1f',
    to: '#c65a2c',
    layout: 'split-right',
    images: { mobile: { src: '/portfolio/poppies/mobile.jpg', width: 703, height: 1429 } },
  },
  {
    title: 'StreetWear KE',
    category: 'Fashion & Retail',
    desc: 'E-commerce website for a fashion brand, with product discovery and WhatsApp-based ordering designed for mobile shoppers.',
    role: 'Website Design · Development',
    link: 'https://verdant-blancmange-e5ed85.netlify.app/',
    from: '#1b1f24',
    to: '#3a4048',
    layout: 'split-left',
    images: { mobile: { src: '/portfolio/streetwear-ke/mobile.jpg', width: 720, height: 1361 } },
  },
  {
    title: 'Rift Valley House',
    category: 'Hospitality & Tourism',
    desc: "Boutique hotel website showcasing the retreat's accommodations and experiences, with enquiry channels for guests planning a stay.",
    role: 'Website Design · Development',
    link: 'https://rift-valley-house.vercel.app',
    from: '#1d3a2f',
    to: '#3f6b52',
    layout: 'center',
    images: { mobile: { src: '/portfolio/rift-valley-house/mobile.jpg', width: 720, height: 1421 } },
  },
  {
    title: 'Sains Restaurant',
    category: 'Food & Beverage',
    desc: 'Flame-grilled restaurant website for an Eldoret kitchen, built to showcase the menu and convert visitors into table bookings and WhatsApp orders.',
    role: 'Website Design · Development',
    link: 'https://sains-restaurant.vercel.app',
    from: '#5c1f16',
    to: '#9c3a1f',
    layout: 'wide',
    images: { mobile: { src: '/portfolio/sains-restaurant/mobile.jpg', width: 720, height: 1428 } },
  },
  {
    title: 'Kahawa House',
    category: 'Café & Coffee',
    desc: 'Café website for a Kenyan coffee house, presenting its story, menu and atmosphere to welcome walk-ins and enquiries.',
    role: 'Website Design · Development',
    link: 'https://kahawa-house.vercel.app',
    from: '#3b2a1a',
    to: '#6f4e2e',
    layout: 'offset',
    images: { mobile: { src: '/portfolio/kahawa-house/mobile.jpg', width: 720, height: 1419 } },
  },
  {
    title: 'Lumina Events',
    category: 'Entertainment & Events',
    desc: 'Event website designed to showcase upcoming experiences, provide essential event information and encourage ticket enquiries.',
    role: 'Website Design · Development',
    link: 'https://lumina-rosy.vercel.app/',
    from: '#33204f',
    to: '#5c3a82',
    layout: 'minimal',
    // No screenshot captured yet — gets the deliberate typographic treatment below.
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Fade-up-on-scroll wrapper that becomes a plain, already-visible element
 * when the user has requested reduced motion — no partial or skipped content. */
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className,
  delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ScreenshotFrame: React.FC<{ img: ProjectImage; alt: string; background: string; hiddenOn?: 'mobile' | 'desktop' }> = ({
  img,
  alt,
  background,
  hiddenOn,
}) => (
  <div
    className={cn(
      'w-full mx-auto p-3 md:p-4 border border-white/10 rounded-md',
      hiddenOn === 'mobile' && 'hidden md:block',
      hiddenOn === 'desktop' && 'md:hidden',
    )}
    style={{ background }}
  >
    <div className="overflow-hidden rounded-[3px] bg-black/25 border border-bone/15" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        loading="lazy"
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  </div>
);

/** A real screenshot in a contained frame, sized from its own native pixel
 * dimensions so nothing is cropped, distorted, or stretched into a shape it
 * wasn't captured in. `size` only changes the frame's max-width. The project's
 * own brand gradient sits behind the screenshot, keeping each project's color
 * identity visible rather than flattening every card to the same neutral tone. */
const ProjectFrame: React.FC<{ project: Project; size?: 'sm' | 'md' | 'lg' }> = ({ project: p, size = 'md' }) => {
  if (!p.images) return null;
  const { mobile, desktop } = p.images;
  const altText = `Mobile homepage of the ${p.title} website`;
  const maxW = { sm: 'max-w-[210px]', md: 'max-w-[250px] sm:max-w-[270px]', lg: 'max-w-[300px] sm:max-w-[340px]' }[size];
  const background = `linear-gradient(135deg, rgba(0,0,0,.4), rgba(0,0,0,.15)), linear-gradient(135deg, ${p.from}, ${p.to})`;

  return (
    <div className={cn('mx-auto', maxW)}>
      <ScreenshotFrame img={mobile} alt={altText} background={background} hiddenOn={desktop ? 'desktop' : undefined} />
      {desktop && (
        <ScreenshotFrame img={desktop} alt={`Desktop homepage of the ${p.title} website`} background={background} hiddenOn="mobile" />
      )}
    </div>
  );
};

/** Number / category / title / description / role / CTA — the text side of
 * every project, reused across every layout variant. */
const ProjectMeta: React.FC<{
  project: Project;
  index: number;
  total: number;
  align?: 'left' | 'center';
  titleSize?: 'md' | 'lg';
}> = ({ project: p, index, total, align = 'left', titleSize = 'md' }) => (
  <div className={align === 'center' ? 'text-center mx-auto max-w-xl' : ''}>
    <p className="text-xs font-medium tracking-[0.15em] text-mist/60 uppercase mb-4">
      {pad(index + 1)} / {pad(total)}
    </p>
    <p className="eyebrow uppercase mb-3">{p.category}</p>
    <h3
      className={cn(
        'font-display font-medium text-bone mb-4 tracking-tight leading-[1.1]',
        titleSize === 'lg' ? 'text-4xl md:text-5xl' : 'text-[1.75rem] md:text-4xl',
      )}
    >
      {p.title}
    </h3>
    <p className={cn('text-sm md:text-base text-mist leading-relaxed mb-5', align === 'center' ? 'mx-auto max-w-md' : 'max-w-sm')}>
      {p.desc}
    </p>
    <p className="text-xs uppercase tracking-[0.1em] text-mist/70 mb-6">{p.role}</p>
    <a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-bone hover:text-ember transition-colors"
    >
      View project
      <ArrowUpRight size={16} />
    </a>
  </div>
);

/** Clickable wrapper around a project's visual — a real, large tap target
 * on mobile, with its own clear accessible name (not a bare icon or "click here"). */
const ProjectLink: React.FC<{ project: Project; children: React.ReactNode; className?: string }> = ({ project: p, children, className }) => (
  <a href={p.link} target="_blank" rel="noreferrer" aria-label={`Visit the live ${p.title} website`} className={cn('group block', className)}>
    {children}
  </a>
);

const ProjectRow: React.FC<{ project: Project; index: number; total: number }> = ({ project: p, index, total }) => {
  if (p.layout === 'minimal') {
    return (
      <Reveal className="py-16 md:py-20 border-t border-white/10">
        <div className="border border-white/10 rounded-md px-6 py-12 md:py-16 text-center max-w-2xl mx-auto">
          <ProjectMeta project={p} index={index} total={total} align="center" titleSize="lg" />
        </div>
      </Reveal>
    );
  }

  if (p.layout === 'center') {
    return (
      <Reveal className="py-16 md:py-24 border-t border-white/10">
        <ProjectMeta project={p} index={index} total={total} align="center" />
        <div className="mt-10">
          <ProjectLink project={p}>
            <ProjectFrame project={p} size="lg" />
          </ProjectLink>
        </div>
      </Reveal>
    );
  }

  if (p.layout === 'wide') {
    return (
      <Reveal className="py-16 md:py-24 border-t border-white/10">
        <ProjectLink project={p} className="mb-8">
          <ProjectFrame project={p} size="lg" />
        </ProjectLink>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-3xl mx-auto md:max-w-none">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] text-mist/60 uppercase mb-3">
              {pad(index + 1)} / {pad(total)}
            </p>
            <p className="eyebrow uppercase mb-3">{p.category}</p>
            <h3 className="font-display font-medium text-[1.75rem] md:text-4xl text-bone tracking-tight leading-[1.1]">{p.title}</h3>
          </div>
          <div className="md:max-w-sm md:text-right">
            <p className="text-sm md:text-base text-mist leading-relaxed mb-3">{p.desc}</p>
            <p className="text-xs uppercase tracking-[0.1em] text-mist/70 mb-4">{p.role}</p>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-bone hover:text-ember transition-colors md:justify-end"
            >
              View project
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>
    );
  }

  if (p.layout === 'offset') {
    return (
      <Reveal className="py-16 md:py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
          <div className="md:col-span-5 md:col-start-2">
            <ProjectLink project={p}>
              <ProjectFrame project={p} />
            </ProjectLink>
          </div>
          <div className="md:col-span-4 md:col-start-8 md:mt-16">
            <ProjectMeta project={p} index={index} total={total} />
          </div>
        </div>
      </Reveal>
    );
  }

  // split-left / split-right
  const imageFirst = p.layout === 'split-left';
  return (
    <Reveal className="py-16 md:py-24 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
        <div className={cn('md:col-span-6', imageFirst ? 'md:col-start-1 order-1' : 'md:col-start-7 order-1 md:order-2')}>
          <ProjectLink project={p}>
            <ProjectFrame project={p} />
          </ProjectLink>
        </div>
        <div className={cn('md:col-span-5', imageFirst ? 'md:col-start-8 order-2' : 'md:col-start-1 order-2 md:order-1')}>
          <ProjectMeta project={p} index={index} total={total} />
        </div>
      </div>
    </Reveal>
  );
};

const PortfolioSlide: React.FC = () => {
  const total = PROJECTS.length;

  return (
    <div className="container mx-auto px-5 md:px-10 py-6 md:py-10">
      <Reveal className="max-w-2xl mb-4">
        <p className="eyebrow uppercase mb-4">Selected Work / 2026</p>
        <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-bone">
          Websites built to be seen. Built to work.
        </h2>
        <p className="mt-4 max-w-lg text-base md:text-lg leading-relaxed text-mist">
          Selected SmartBiz website projects across hospitality, food, retail and events — every link goes to a live site.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          <span className="text-xs font-medium tracking-[0.15em] text-mist/70 uppercase">{pad(total)} Projects</span>
        </div>
      </Reveal>

      <div>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} index={i} total={total} />
        ))}
      </div>

      <Reveal className="pt-16 md:pt-20 pb-4 md:pb-6 border-t border-white/10 text-center">
        <h3 className="font-display font-medium text-2xl md:text-3xl text-bone mb-3 tracking-tight">Have a project in mind?</h3>
        <p className="text-base text-mist mb-8">Let's build something worth showing.</p>
        <a href="/contact" className="btn-primary">
          Start a project
          <ArrowUpRight size={18} />
        </a>
      </Reveal>
    </div>
  );
};

export default PortfolioSlide;
