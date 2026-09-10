import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { SectionAlign } from './section.types';

export interface SectionHeaderProps {
  /** Small pill label above the title, e.g. "Services" */
  eyebrow: string;
  title: string;
  description?: string;
  align?: SectionAlign;
  /** Dark-mode variant for dark sections */
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable section header — eyebrow pill + title + description.
 * Replaces the copy-pasted `text-center mb-14` header blocks.
 */
const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className,
  children,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-12 md:mb-14',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <span
        className={cn(
          'inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4',
          dark ? 'bg-brand-lime/20 text-brand-lime' : 'bg-brand-lime/20 text-brand-black'
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
          dark ? 'text-white' : 'text-brand-black',
          align === 'center' && 'mx-auto'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg max-w-2xl leading-relaxed',
            dark ? 'text-neutral-400' : 'text-neutral-600',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
