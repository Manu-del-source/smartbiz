import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section title used across the page so headline size, weight and rhythm
 * stay consistent whether the section sits on a dark or a paper background.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  tone = 'light',
  align = 'left',
  className,
}) => {
  const isCenter = align === 'center';
  return (
    <div className={cn('mb-12 md:mb-16 max-w-2xl', isCenter && 'mx-auto text-center', className)}>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(
          'font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-paper-ink'
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn('mt-4 text-base md:text-lg leading-relaxed', tone === 'dark' ? 'text-mist' : 'text-slate')}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
