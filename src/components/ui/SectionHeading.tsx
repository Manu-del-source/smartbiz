import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section title used across the page so headline size, weight and rhythm
 * stay consistent. The whole site now shares one dark surface, so this no longer
 * branches on a light/dark tone.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtitle, align = 'left', className }) => {
  const isCenter = align === 'center';
  return (
    <div className={cn('mb-12 md:mb-16 max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display font-medium text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-bone"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-lg text-base md:text-lg leading-relaxed text-mist"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
