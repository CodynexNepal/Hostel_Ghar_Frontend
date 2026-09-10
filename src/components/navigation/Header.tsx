'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import {
  Home,
  Search,
  HelpCircle,
  Building2,
  Tag,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home size={16} strokeWidth={2.2} /> },
  { label: 'Find Hostels', href: '/hostels', icon: <Search size={16} strokeWidth={2.2} /> },
  {
    label: 'How It Works',
    href: '/how-it-works',
    icon: <HelpCircle size={16} strokeWidth={2.2} />,
  },
  {
    label: 'For Hostel Owners',
    href: '/for-owners',
    icon: <Building2 size={16} strokeWidth={2.2} />,
  },
  { label: 'Pricing', href: '/pricing', icon: <Tag size={16} strokeWidth={2.2} /> },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Header slide down
      tl.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });

      // Logo bounce in with rotation
      tl.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Nav items stagger animation
      tl.fromTo(
        navItemsRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        '-=0.3'
      );

      // CTA buttons slide in
      tl.fromTo(
        ctaRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll effect with border radius and blur
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = 100;
    const progress = Math.min(scrollY / maxScroll, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Animate header on scroll with border radius and blur
  useEffect(() => {
    if (!headerRef.current) return;

    // Kill any existing tween
    if (scrollTweenRef.current) {
      scrollTweenRef.current.kill();
    }

    const isScrolled = scrollProgress > 0;

    scrollTweenRef.current = gsap.to(headerRef.current, {
      borderRadius: isScrolled ? '0 0 24px 24px' : '0 0 0 0',
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'blur(0px) saturate(100%)',
      WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'blur(0px) saturate(100%)',
      boxShadow: isScrolled
        ? '0 4px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)'
        : '0 0 0 rgba(0, 0, 0, 0)',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [scrollProgress]);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        mobileNavItemsRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [isMenuOpen]);

  // Hamburger animation
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);

    if (hamburgerRef.current) {
      gsap.fromTo(
        hamburgerRef.current,
        { rotation: isMenuOpen ? 180 : 0 },
        { rotation: isMenuOpen ? 0 : 180, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  // Nav item hover animation
  const handleNavHover = (index: number, isEntering: boolean) => {
    const item = navItemsRef.current[index];
    if (!item) return;

    const underline = item.querySelector('.nav-underline');
    if (underline) {
      gsap.to(underline, {
        scaleX: isEntering ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-brand-white/95"
        style={{
          backdropFilter: scrollProgress > 0 ? 'blur(24px) saturate(200%)' : 'none',
          WebkitBackdropFilter: scrollProgress > 0 ? 'blur(24px) saturate(200%)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" ref={logoRef} className="flex items-center gap-3 group">
              <div className="relative overflow-hidden rounded-xl border-2 border-brand-black bg-white shadow-lime transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 md:w-11 md:h-11 w-10 h-10">
                <Image
                  src="/images/logo/hostel_ghar_logo.jpg"
                  alt="Hostel Ghar logo"
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                  priority
                />
                <Sparkles
                  size={10}
                  strokeWidth={2.5}
                  className="absolute -top-1.5 -right-1.5 text-brand-black opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-12"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-brand-black leading-tight tracking-tight">
                  Hostel Ghar
                </span>
                <span className="text-[9px] md:text-[10px] text-neutral-500 font-semibold hidden sm:block tracking-widest uppercase">
                  Find Your Stay
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav ref={navRef} className="hidden lg:flex items-center">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  ref={(el) => {
                    navItemsRef.current[index] = el;
                  }}
                  className="list-none"
                  onMouseEnter={() => handleNavHover(index, true)}
                  onMouseLeave={() => handleNavHover(index, false)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-tight transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-brand-black bg-brand-lime/15'
                        : 'text-neutral-500 hover:text-brand-black hover:bg-neutral-100/70'
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ${isActive(item.href) ? 'text-brand-black' : 'text-neutral-400'}`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                    <span
                      className={`nav-underline absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-brand-lime rounded-full origin-left scale-x-0 ${
                        isActive(item.href) ? 'scale-x-100' : ''
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div ref={ctaRef} className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-neutral-500 hover:text-brand-black transition-all duration-200 rounded-lg hover:bg-neutral-100/70 tracking-tight"
              >
                <LogIn size={15} strokeWidth={2.2} />
                <span className="hidden lg:inline">Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-brand-black bg-brand-lime/20 hover:bg-brand-lime/35 rounded-lg transition-all duration-200 tracking-tight"
              >
                <UserPlus size={15} strokeWidth={2.2} />
                <span className="hidden lg:inline">Register</span>
              </Link>
              <Link
                href="/list-hostel"
                className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-bold text-brand-black bg-brand-lime rounded-lg hover:bg-brand-lime/85 shadow-lime hover:shadow-lime-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 tracking-tight"
              >
                List Your Hostel
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={hamburgerRef}
              onClick={handleMenuToggle}
              className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-lg bg-brand-lime/15 hover:bg-brand-lime/30 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={2.2} />
              ) : (
                <Menu size={20} strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden overflow-hidden bg-brand-white border-t border-neutral-100"
          >
            <div className="px-4 py-5 space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  ref={(el) => {
                    mobileNavItemsRef.current[index] = el;
                  }}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-brand-black bg-brand-lime/15'
                      : 'text-neutral-500 hover:text-brand-black hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className={`${isActive(item.href) ? 'text-brand-black' : 'text-neutral-400'}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                  <ChevronRight size={14} strokeWidth={2.2} className="ml-auto text-neutral-300" />
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-neutral-100 space-y-1">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-neutral-500 hover:text-brand-black hover:bg-neutral-50 transition-all duration-200 tracking-tight"
                >
                  <LogIn size={16} strokeWidth={2.2} />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-brand-black bg-brand-lime/15 hover:bg-brand-lime/25 transition-all duration-200 tracking-tight"
                >
                  <UserPlus size={16} strokeWidth={2.2} />
                  Register
                </Link>
                <Link
                  href="/list-hostel"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg text-sm font-bold text-brand-black bg-brand-lime shadow-lime hover:shadow-lime-lg transition-all duration-300 mt-3 tracking-tight"
                >
                  List Your Hostel
                  <ChevronRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
