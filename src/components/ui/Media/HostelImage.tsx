import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface HostelImageProps {
  src: string;
  alt: string;
  /** Tailwind aspect class, defaults to 4/3 */
  aspect?: 'square' | 'video' | 'wide' | 'portrait' | 'auto';
  /** Rounded preset */
  rounded?: 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none';
  /** Show brand lime frame + shadow (hero / featured cards) */
  framed?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** object-position tweak so one static asset can vary across cards */
  objectPosition?: string;
  /** Optional overlay (badge, gradient caption, avatar initials) */
  children?: ReactNode;
  /** Subtle zoom on hover for cards */
  zoomOnHover?: boolean;
}

const aspectStyles: Record<NonNullable<HostelImageProps['aspect']>, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  auto: '',
};

const roundedStyles: Record<NonNullable<HostelImageProps['rounded']>, string> = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
  none: 'rounded-none',
};

/**
 * Reusable image shell for all `public/images/static/*` assets.
 * Single source of truth for aspect, rounding, lime frame and
 * object-cover behaviour — replaces hardcoded <img> / SVG blocks.
 *
 * Usage:
 * ```tsx
 * <HostelImage src="/images/static/hostel.jpg" alt="Hostel room" />
 * ```
 */
const HostelImage = ({
  src,
  alt,
  aspect = 'wide',
  rounded = '3xl',
  framed = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className,
  imgClassName,
  objectPosition = 'center',
  children,
  zoomOnHover = false,
}: HostelImageProps) => {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-[#eef3e4]',
        aspectStyles[aspect],
        roundedStyles[rounded],
        framed && 'border-2 border-brand-black shadow-lime',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectPosition }}
        className={cn(
          'object-cover',
          zoomOnHover && 'transition-transform duration-500 group-hover:scale-105',
          imgClassName
        )}
      />
      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
};

export default HostelImage;
