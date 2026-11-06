'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import {
  Home,
  Search,
  HelpCircle,
  Building2,
  Tag,
  LogIn,
  UserPlus,
  LogOut,
  Loader2,
  User,
  Calendar,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import {
  getCurrentUser,
  logout,
  checkAuthStatus,
  clearAuthSession,
  AuthUser,
} from '@/lib/api/auth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home size={16} strokeWidth={2.4} /> },
  { label: 'Find Hostels', href: '/hostels', icon: <Search size={16} strokeWidth={2.4} /> },
  {
    label: 'How It Works',
    href: '/how-it-works',
    icon: <HelpCircle size={16} strokeWidth={2.4} />,
  },
  {
    label: 'For Hostel Owners',
    href: '/for-owners',
    icon: <Building2 size={16} strokeWidth={2.4} />,
  },
  { label: 'Pricing', href: '/pricing', icon: <Tag size={16} strokeWidth={2.4} /> },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncAuth = () => {
      const authed = checkAuthStatus();
      setIsAuth(authed);
      if (authed && typeof window !== 'undefined') {
        const stored = localStorage.getItem('user');
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncAuth();

    // Verify session in background if cookies or tokens are active
    if (checkAuthStatus()) {
      getCurrentUser()
        .then((currentUser) => {
          if (currentUser) {
            setIsAuth(true);
            setUser(currentUser);
          } else if (!checkAuthStatus()) {
            setIsAuth(false);
            setUser(null);
          }
        })
        .catch(() => {
          clearAuthSession();
          setIsAuth(false);
          setUser(null);
        });
    } else {
      setIsAuth(false);
      setUser(null);
    }

    window.addEventListener('auth_state_changed', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('auth_state_changed', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, [pathname]);

  // Close menus on path change
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setIsAuth(false);
      setUser(null);
      setIsProfileMenuOpen(false);
      setIsMenuOpen(false);
      setShowLogoutModal(false);
      router.push('/login');
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  // Detect scroll to toggle free-floating centered pill mode
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 45);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  // Nav item hover animation (top unscrolled mode)
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
      {/* Fixed Full-Width Viewport Container: immune to transform-based alignment bugs */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none transition-all duration-300"
      >
        {/* ==============================================================
            SCROLLED STATE: Free-Floating Centered Pill with ONLY Icons
           ============================================================== */}
        {isScrolled ? (
          <div
            className="pointer-events-auto mx-auto mt-3 sm:mt-4 w-[95vw] sm:w-fit sm:min-w-[580px] md:min-w-[640px] max-w-3xl rounded-full bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-2xl px-3.5 sm:px-5 py-1.5 sm:py-2 transition-all duration-300 ease-out"
            style={{
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            }}
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 sm:gap-4 h-11 sm:h-12 w-full">
              {/* Left Column: Logo Mark (Aligned Left of the 1fr column) */}
              <div className="flex items-center justify-start min-w-0">
                <Link
                  href="/"
                  className="flex items-center gap-2 group shrink-0"
                  title="Hostel Ghar - Home"
                >
                  <div className="relative overflow-hidden rounded-full border-2 border-brand-black bg-white shadow-xs transition-transform duration-300 group-hover:scale-105 w-8 h-8 sm:w-9 sm:h-9">
                    <Image
                      src="/images/logo/hostel_ghar_logo.jpg"
                      alt="Hostel Ghar"
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-brand-black tracking-tight hidden sm:inline whitespace-nowrap">
                    Hostel Ghar
                  </span>
                </Link>
              </div>

              {/* Center Column: EXACT DEAD CENTER Navigation Icons */}
              <div className="flex items-center justify-center shrink-0">
                <nav className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-1 rounded-full bg-neutral-100/80 border border-neutral-200/70 shadow-2xs">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      title={item.label}
                      aria-label={item.label}
                      className={`relative group/icon flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-brand-black bg-brand-lime shadow-xs font-bold scale-105'
                          : 'text-neutral-700 hover:text-brand-black hover:bg-white'
                      }`}
                    >
                      <span className="transition-transform duration-200 group-hover/icon:scale-110">
                        {item.icon}
                      </span>
                      {/* Floating Micro Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-brand-black text-white text-[10px] font-semibold rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm z-50">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right Column: Actions / User Profile (Aligned Right of the 1fr column) */}
              <div className="flex items-center justify-end min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {isAuth ? (
                    <>
                      <Link
                        href="/my-bookings"
                        title="My Bookings"
                        aria-label="My Bookings"
                        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-brand-black bg-brand-lime/20 hover:bg-brand-lime/35 transition-colors"
                      >
                        <Calendar size={15} strokeWidth={2.4} />
                      </Link>

                      {/* Profile Trigger */}
                      <div className="relative" ref={profileMenuRef}>
                        <button
                          type="button"
                          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                          aria-expanded={isProfileMenuOpen}
                          aria-haspopup="true"
                          aria-label="User profile options"
                          className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 shadow-2xs transition-all cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-lime to-emerald-400 text-brand-black font-bold flex items-center justify-center text-xs shadow-2xs border border-brand-black/10 shrink-0">
                            {user?.fullName ? (
                              user.fullName
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')
                                .toUpperCase()
                            ) : (
                              <User size={13} strokeWidth={2.2} />
                            )}
                          </div>
                          <ChevronDown
                            size={13}
                            strokeWidth={2.4}
                            className={`text-neutral-500 transition-transform duration-200 ${
                              isProfileMenuOpen ? 'rotate-180 text-brand-black' : ''
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu below profile with ^ pointer */}
                        {isProfileMenuOpen && (
                          <div
                            role="menu"
                            className="absolute right-0 top-full mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200/90 py-1.5 z-50 animate-scale-up origin-top-right focus:outline-none"
                          >
                            {/* Caret arrow indicator ^ pointing up at the profile */}
                            <div
                              aria-hidden="true"
                              className="absolute -top-1.5 right-5 w-3 h-3 bg-white border-t border-l border-neutral-200 rotate-45 transform"
                            />

                            {/* Profile Header */}
                            <div className="px-3.5 py-2.5 border-b border-neutral-100 relative bg-neutral-50/70 rounded-t-2xl -mt-1.5">
                              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                                Signed in as
                              </p>
                              <p className="text-xs font-bold text-brand-black truncate mt-0.5">
                                {user?.fullName || user?.firstName || 'Hostel Ghar User'}
                              </p>
                              {user?.email && (
                                <p
                                  className="text-[11px] text-neutral-500 truncate mt-0.5"
                                  title={user.email}
                                >
                                  {user.email}
                                </p>
                              )}
                              {user?.role && (
                                <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-brand-lime/30 text-brand-black border border-brand-black/10">
                                  {user.role}
                                </span>
                              )}
                            </div>

                            {/* Quick Navigation Items */}
                            <div className="p-1.5 space-y-0.5">
                              <Link
                                href="/my-bookings"
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-brand-black hover:bg-brand-lime/15 rounded-xl transition-colors tracking-tight"
                              >
                                <Calendar
                                  size={14}
                                  strokeWidth={2.2}
                                  className="text-neutral-500 shrink-0"
                                />
                                <span>My Bookings</span>
                              </Link>
                            </div>

                            <div className="border-t border-neutral-100 my-1" />

                            {/* Option to Logout below the profile with icon */}
                            <div className="p-1.5 pt-0">
                              <button
                                onClick={handleLogoutClick}
                                type="button"
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors tracking-tight cursor-pointer text-left"
                              >
                                <LogOut
                                  size={14}
                                  strokeWidth={2.2}
                                  className="text-rose-600 shrink-0"
                                />
                                <span>Logout</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        title="Login"
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-neutral-700 hover:text-brand-black rounded-full hover:bg-neutral-100 transition-colors whitespace-nowrap"
                      >
                        <LogIn size={14} strokeWidth={2.4} />
                        <span className="hidden sm:inline">Login</span>
                      </Link>
                      <Link
                        href="/list-hostel"
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-black bg-brand-lime hover:bg-brand-lime/85 rounded-full shadow-xs transition-all whitespace-nowrap"
                      >
                        <span className="hidden sm:inline">List Hostel</span>
                        <span className="sm:hidden">List</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ==============================================================
             UNSCROLLED TOP STATE: Full Navigation Header with Full Text
             ============================================================== */
          <div
            className="pointer-events-auto w-full bg-brand-white/95 border-b border-neutral-150 px-4 sm:px-6 lg:px-8 py-0 transition-all duration-300 ease-out"
            style={{
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            }}
          >
            <div className="max-w-7xl mx-auto">
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
                        className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13.5px] font-bold tracking-tight transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-brand-black bg-brand-lime/30 shadow-2xs font-extrabold'
                            : 'text-neutral-700 hover:text-brand-black hover:bg-neutral-100/90'
                        }`}
                      >
                        <span
                          className={`transition-all duration-300 ${isActive(item.href) ? 'text-brand-black' : 'text-neutral-600'}`}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                        <span
                          className={`nav-underline absolute bottom-0.5 left-3.5 right-3.5 h-[2.5px] bg-brand-lime rounded-full origin-left scale-x-0 ${
                            isActive(item.href) ? 'scale-x-100' : ''
                          }`}
                        />
                      </Link>
                    </li>
                  ))}
                </nav>

                {/* Desktop CTA Buttons */}
                <div ref={ctaRef} className="hidden md:flex items-center gap-2">
                  {isAuth ? (
                    <>
                      <Link
                        href="/my-bookings"
                        className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold text-brand-black bg-brand-lime/20 hover:bg-brand-lime/35 rounded-lg transition-all duration-200 tracking-tight"
                      >
                        <Calendar size={15} strokeWidth={2.2} />
                        <span>My Bookings</span>
                      </Link>

                      {/* User Profile dropdown menu */}
                      <div className="relative" ref={profileMenuRef}>
                        <button
                          type="button"
                          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                          aria-expanded={isProfileMenuOpen}
                          aria-haspopup="true"
                          aria-label="User profile options"
                          className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                            isProfileMenuOpen
                              ? 'border-brand-black bg-neutral-100 shadow-sm'
                              : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 shadow-2xs'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-lime to-emerald-400 text-brand-black font-bold flex items-center justify-center text-xs shadow-2xs border border-brand-black/10 shrink-0">
                            {user?.fullName ? (
                              user.fullName
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')
                                .toUpperCase()
                            ) : user?.firstName ? (
                              user.firstName[0].toUpperCase()
                            ) : (
                              <User size={13} strokeWidth={2.2} />
                            )}
                          </div>

                          <span className="text-[12px] font-semibold text-brand-black max-w-[110px] truncate tracking-tight">
                            {user?.fullName
                              ? user.fullName.split(' ')[0]
                              : user?.firstName ||
                                (user?.email ? user.email.split('@')[0] : 'Profile')}
                          </span>

                          {/* Caret / Icon below/next to profile flipping up (^) when open */}
                          <ChevronDown
                            size={14}
                            strokeWidth={2.4}
                            className={`text-neutral-500 transition-transform duration-200 ${
                              isProfileMenuOpen ? 'rotate-180 text-brand-black' : ''
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu below profile with ^ pointer */}
                        {isProfileMenuOpen && (
                          <div
                            role="menu"
                            className="absolute right-0 top-full mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200/90 py-1.5 z-50 animate-scale-up origin-top-right focus:outline-none"
                          >
                            {/* Caret arrow indicator ^ pointing up at the profile */}
                            <div
                              aria-hidden="true"
                              className="absolute -top-1.5 right-5 w-3 h-3 bg-white border-t border-l border-neutral-200 rotate-45 transform"
                            />

                            {/* Profile Header */}
                            <div className="px-3.5 py-2.5 border-b border-neutral-100 relative bg-neutral-50/70 rounded-t-2xl -mt-1.5">
                              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                                Signed in as
                              </p>
                              <p className="text-xs font-bold text-brand-black truncate mt-0.5">
                                {user?.fullName || user?.firstName || 'Hostel Ghar User'}
                              </p>
                              {user?.email && (
                                <p
                                  className="text-[11px] text-neutral-500 truncate mt-0.5"
                                  title={user.email}
                                >
                                  {user.email}
                                </p>
                              )}
                              {user?.role && (
                                <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-brand-lime/30 text-brand-black border border-brand-black/10">
                                  {user.role}
                                </span>
                              )}
                            </div>

                            {/* Quick Navigation Items */}
                            <div className="p-1.5 space-y-0.5">
                              <Link
                                href="/my-bookings"
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-brand-black hover:bg-brand-lime/15 rounded-xl transition-colors tracking-tight"
                              >
                                <Calendar
                                  size={14}
                                  strokeWidth={2.2}
                                  className="text-neutral-500 shrink-0"
                                />
                                <span>My Bookings</span>
                              </Link>
                            </div>

                            <div className="border-t border-neutral-100 my-1" />

                            {/* Option to Logout below the profile with icon */}
                            <div className="p-1.5 pt-0">
                              <button
                                onClick={handleLogoutClick}
                                type="button"
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors tracking-tight cursor-pointer text-left"
                              >
                                <LogOut
                                  size={14}
                                  strokeWidth={2.2}
                                  className="text-rose-600 shrink-0"
                                />
                                <span>Logout</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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

            {/* Mobile Slide-down Menu for unscrolled mode */}
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
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-bold tracking-tight transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-brand-black bg-brand-lime/30 font-extrabold'
                          : 'text-neutral-700 hover:text-brand-black hover:bg-neutral-100/80'
                      }`}
                    >
                      <span
                        className={`${isActive(item.href) ? 'text-brand-black' : 'text-neutral-600'}`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                      <ChevronRight
                        size={14}
                        strokeWidth={2.2}
                        className="ml-auto text-neutral-400"
                      />
                    </Link>
                  ))}

                  <div className="pt-3 mt-3 border-t border-neutral-100 space-y-1">
                    {isAuth ? (
                      <>
                        {/* User Profile Card */}
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-lime to-emerald-400 text-brand-black font-bold flex items-center justify-center text-xs shadow-xs border border-brand-black/10 shrink-0">
                              {user?.fullName ? (
                                user.fullName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join('')
                                  .toUpperCase()
                              ) : (
                                <User size={15} strokeWidth={2.2} />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-xs font-bold text-brand-black truncate">
                                {user?.fullName || user?.firstName || 'Hostel Ghar User'}
                              </span>
                              {user?.email && (
                                <span className="text-[11px] text-neutral-500 truncate">
                                  {user.email}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/my-bookings"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-brand-black bg-brand-lime/15 hover:bg-brand-lime/25 transition-all duration-200 tracking-tight"
                        >
                          <Calendar size={16} strokeWidth={2.2} />
                          My Bookings
                        </Link>

                        {/* Option to logout below profile with icon */}
                        <button
                          onClick={handleLogoutClick}
                          type="button"
                          className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200 tracking-tight text-left cursor-pointer"
                        >
                          <LogOut size={16} strokeWidth={2.2} />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      {/* Logout Confirmation & Spinner Modal */}
      {showLogoutModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto"
          onClick={() => {
            if (!isLoggingOut) setShowLogoutModal(false);
          }}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-100 text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            {!isLoggingOut && (
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            )}

            {/* Icon / Spinner */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
              {isLoggingOut ? (
                <Loader2 size={30} className="text-rose-600 animate-spin" />
              ) : (
                <LogOut size={28} className="text-rose-600 stroke-[2.2]" />
              )}
            </div>

            <h3 id="logout-modal-title" className="text-xl font-extrabold text-brand-black mb-1.5">
              {isLoggingOut ? 'Logging you out...' : 'Log out of Hostel Ghar?'}
            </h3>

            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              {isLoggingOut
                ? 'Please wait a moment while we secure your session.'
                : 'Are you sure you want to sign out? You can sign back in anytime.'}
            </p>

            {isLoggingOut ? (
              <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-50 border border-neutral-100 text-sm font-semibold text-neutral-600">
                <Loader2 size={16} className="animate-spin text-brand-black" />
                <span>Signing out...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-2.5 px-4 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut size={15} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
