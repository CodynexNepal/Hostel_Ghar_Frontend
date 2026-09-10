import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type CTAButtonProps =
  | {
      children: React.ReactNode;
      href: string;
      variant?: 'lime' | 'dark' | 'dark-outline' | 'light-outline';
      arrow?: 'right' | 'up-right' | 'none';
      className?: string;
      onClick?: never;
    }
  | {
      children: React.ReactNode;
      href?: never;
      variant?: 'lime' | 'dark' | 'dark-outline' | 'light-outline';
      arrow?: 'right' | 'up-right' | 'none';
      className?: string;
      onClick?: () => void;
    };

const variantStyles = {
  lime: 'bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 shadow-lime hover:shadow-lime-lg',
  dark: 'bg-brand-black text-white font-semibold hover:bg-brand-black/90 shadow-lg shadow-brand-black/20',
  'dark-outline':
    'bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/10',
  'light-outline':
    'bg-white text-brand-black font-semibold border border-neutral-200 hover:border-brand-lime hover:shadow-lime',
} as const;

/**
 * Reusable CTA button / link — one place for the
 * `px-7 py-3.5 rounded-xl hover:-translate-y-0.5` pattern
 * copy-pasted across every page.
 */
const CTAButton = ({
  children,
  href,
  variant = 'lime',
  arrow = 'none',
  className,
  onClick,
}: CTAButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 sm:px-8 sm:py-4',
    variantStyles[variant],
    className
  );

  const Arrow = arrow === 'up-right' ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {arrow !== 'none' && <Arrow size={18} strokeWidth={2.5} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default CTAButton;
