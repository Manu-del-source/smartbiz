import React from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'outline-dark' | 'outline-light';

interface ButtonProps extends React.ComponentPropsWithoutRef<'a'> {
  variant?: Variant;
  className?: string;
}

const VARIANT_CLASS: Record<Variant, string> = {
  'primary': 'btn-primary',
  'outline-dark': 'btn-outline-dark',
  'outline-light': 'btn-outline-light',
};

/** Shared CTA used across sections so every button in the site stays visually consistent. */
const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => (
  <a className={cn(VARIANT_CLASS[variant], className)} {...props}>
    {children}
  </a>
);

export default Button;
