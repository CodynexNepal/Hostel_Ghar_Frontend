import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { SectionTone, SectionSpacing } from './section.types';

export interface SectionProps {
  children: ReactNode;
  /** Visual background tone */
  tone?: SectionTone;
  /** Vertical spacing preset */
  spacing?: SectionSpacing;
  /** Extra classes on the <section> element */
  className?: string;
  /** Extra classes on the inner container */
  containerClassName?: string;
  /** Max width preset */
  container?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Section id for anchor links */
  id?: string;
}

const toneStyles: Record<SectionTone, string> = {
  white: 'bg-white',
  gray: 'bg-[#f8f8f8]',
  dark: 'bg-brand-black',
  tint: 'bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc]',
};

const spacingStyles: Record<SectionSpacing, string> = {
  sm: 'py-10 md:py-14',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-28',
  none: '',
};

const containerStyles = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
} as const;

/**
 * Reusable page section shell — single source of truth for
 * section background, vertical rhythm and horizontal container.
 *
 * Replaces every hardcoded `<section className="py-16 md:py-24 ...">`
 * + `<div className="max-w-7xl mx-auto px-4 ...">` combo.
 */
const Section = ({
  children,
  tone = 'white',
  spacing = 'md',
  className,
  containerClassName,
  container = 'xl',
  id,
}: SectionProps) => {
  return (
    <section id={id} className={cn(toneStyles[tone], spacingStyles[spacing], className)}>
      <div
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          containerStyles[container],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
