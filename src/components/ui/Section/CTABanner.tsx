import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface CTABannerProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'tint' | 'black' | 'image';
  /** Used when variant="image" — e.g. /images/static/hostel.jpg */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * Reusable CTA banner — replaces the hardcoded
 * `bg-brand-black rounded-3xl text-center` blocks
 * scattered across pages.
 */
const CTABanner = ({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
  imageSrc,
  imageAlt = 'Hostel Ghar',
  className,
}: CTABannerProps) => {
  if (variant === 'image' && imageSrc) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border-2 border-brand-black shadow-lime',
          className
        )}
      >
        <div className="relative h-64 md:h-72">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-brand-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 text-white max-w-xl">
              {title}
            </h3>
            {description && (
              <p className="max-w-xl mb-6 text-base md:text-lg leading-relaxed text-neutral-200">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 shadow-lime hover:shadow-lime-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {primaryLabel}
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 bg-white/10 text-white hover:bg-white/20"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-3xl px-6 py-10 text-center md:p-12',
        variant === 'dark' && 'bg-brand-black',
        variant === 'black' && 'bg-black',
        variant === 'tint' && 'bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc] border border-brand-lime/30',
        className
      )}
    >
      <h3
        className={cn(
          'text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4',
          variant === 'tint' ? 'text-brand-black' : 'text-white'
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed',
            variant === 'tint' ? 'text-neutral-600' : 'text-neutral-300'
          )}
        >
          {description}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 shadow-lime hover:shadow-lime-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          {primaryLabel}
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link
            href={secondaryHref}
            className={cn(
              'inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5',
              variant === 'tint'
                ? 'bg-brand-black text-white hover:bg-brand-black/90 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            )}
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CTABanner;
