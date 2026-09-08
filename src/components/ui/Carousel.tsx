'use client';

import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  className = '',
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsInView, setItemsInView] = useState(itemsPerView.desktop);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const maxIndex = Math.max(0, children.length - itemsInView);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsInView(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsInView(itemsPerView.tablet);
      } else {
        setItemsInView(itemsPerView.desktop);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const slideTo = useCallback(
    (index: number) => {
      if (isAnimating || !trackRef.current) return;
      setIsAnimating(true);
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      const itemWidth = 100 / itemsInView;
      const translateX = -(clampedIndex * itemWidth);

      gsap.to(trackRef.current, {
        x: `${translateX}%`,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          setIsAnimating(false);
          setCurrentIndex(clampedIndex);
        },
      });
    },
    [isAnimating, maxIndex, itemsInView]
  );

  const goToNext = useCallback(() => {
    if (currentIndex >= maxIndex) {
      slideTo(0);
    } else {
      slideTo(currentIndex + 1);
    }
  }, [currentIndex, maxIndex, slideTo]);

  const goToPrev = useCallback(() => {
    if (currentIndex <= 0) {
      slideTo(maxIndex);
    } else {
      slideTo(currentIndex - 1);
    }
  }, [currentIndex, maxIndex, slideTo]);

  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, goToNext]);

  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
    }
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${gap}px` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / itemsInView}% - ${(gap * (itemsInView - 1)) / itemsInView}px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={goToPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-medium border border-neutral-100 flex items-center justify-center text-brand-black hover:bg-brand-lime hover:border-brand-lime transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-medium border border-neutral-100 flex items-center justify-center text-brand-black hover:bg-brand-lime hover:border-brand-lime transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </>
      )}

      {showDots && maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => slideTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-brand-lime'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
