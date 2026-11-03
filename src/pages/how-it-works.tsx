'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import LottieAnimation from '@/components/lottie/LottieAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserPlus,
  Search,
  CalendarCheck,
  Building2,
  Bell,
  ArrowRight,
  Zap,
  ShieldCheck,
  Tag,
  PhoneCall,
  HeartHandshake,
  Users,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description:
      'Sign up in seconds as a traveler, hostel owner, or resident. Our secure authentication ensures your data stays protected.',
    icon: <UserPlus size={18} strokeWidth={2} />,
    features: ['Quick registration', 'Role-based access', 'Secure authentication'],
  },
  {
    number: '02',
    title: 'Discover Hostels',
    description:
      'Browse through hundreds of verified hostels across Nepal. Filter by location, price, amenities, and ratings.',
    icon: <Search size={18} strokeWidth={2} />,
    features: ['Advanced filters', 'Real-time availability', 'Verified listings'],
  },
  {
    number: '03',
    title: 'Book or Schedule a Visit',
    description:
      'Send a direct room enquiry or schedule a physical visit to see the rooms and facilities before booking.',
    icon: <CalendarCheck size={18} strokeWidth={2} />,
    features: ['Visit scheduling', 'Direct owner contact', 'Zero booking fees'],
  },
  {
    number: '04',
    title: 'Manage Your Hostel',
    description:
      'Hostel owners get a powerful dashboard to manage residents, track fees, and handle leave requests.',
    icon: <Building2 size={18} strokeWidth={2} />,
    features: ['Owner dashboard', 'Resident management', 'Fee tracking'],
  },
  {
    number: '05',
    title: 'Stay Connected',
    description:
      'Receive timely updates for booking confirmations, monthly fee receipts, notices, and gate leave requests.',
    icon: <Bell size={18} strokeWidth={2} />,
    features: ['Instant updates', 'Leave approvals', 'Notice board'],
  },
];

const features = [
  {
    icon: <ShieldCheck size={18} strokeWidth={2} />,
    title: 'Physically Verified Stays',
    description:
      'Every hostel is audited for student safety, clean drinking water, hot water, and verified ownership.',
  },
  {
    icon: <Tag size={18} strokeWidth={2} />,
    title: 'Transparent Tariffs',
    description:
      'Direct published monthly rent with meals and laundry included. Zero hidden broker charges or surprises.',
  },
  {
    icon: <PhoneCall size={18} strokeWidth={2} />,
    title: 'Direct Owner Connect',
    description:
      'Speak directly with hostel owners and wardens to ask questions, check vacancies, and arrange visits.',
  },
  {
    icon: <HeartHandshake size={18} strokeWidth={2} />,
    title: 'Resident-First Experience',
    description:
      'Peaceful study environments, hygienic meals, clear house rules, and responsive hostel management.',
  },
];

const HowItWorksPage = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out' }
      );
      gsap.utils.toArray<HTMLElement>('.step-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>How It Works - Hostel Ghar</title>
        <meta name="description" content="Discover how Hostel Ghar simplifies hostel booking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-transparent relative">
        {/* Dedicated Background Square Grid Overlay */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-square-grid opacity-85"
        />

        <Header />
        <section className="relative z-10 overflow-hidden bg-gradient-to-b from-brand-lime/10 via-transparent to-transparent pt-16 pb-16 md:pt-24 md:pb-24 border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/25 text-brand-black rounded-full mb-6 border border-brand-lime/50 font-bold text-xs sm:text-sm">
              <Zap size={16} strokeWidth={2} className="text-brand-black" />
              <span>Simple. Fast. Reliable.</span>
            </div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black tracking-tight mb-6 leading-tight">
              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-text-reveal">How Hostel Ghar</span>
              </span>{' '}
              <span className="inline-block overflow-hidden pb-1">
                <span className="animate-text-reveal-delay-1 relative inline-block ml-2">
                  <span className="relative z-10 px-2.5 py-0.5 rounded-xl bg-brand-lime text-brand-black shadow-lime">
                    Works
                  </span>
                </span>
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              From finding your perfect hostel to managing your stay, we&apos;ve simplified every
              step.
            </p>
            <div className="hero-cta flex flex-wrap justify-center gap-4">
              <Link
                href="/hostels"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                Find Hostels <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300 hover:-translate-y-0.5 shadow-lime"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* Steps Section */}
        <section ref={stepsRef} className="py-16 md:py-24 bg-transparent relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Step by Step
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight">
                Your Journey With Us
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200/80 md:-translate-x-1/2">
                <div className="timeline-line absolute inset-0 bg-brand-lime origin-top"></div>
              </div>
              <div className="space-y-12 md:space-y-16">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`step-card relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-brand-lime rounded-full border-4 border-white shadow-medium -translate-x-1/2 z-10"></div>
                    <div
                      className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                    >
                      <div
                        className={`inline-flex items-center gap-2.5 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-lime/25 text-brand-black border border-brand-lime/50 flex items-center justify-center shrink-0">
                          {step.icon}
                        </div>
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-black text-brand-lime text-xs font-mono font-bold tracking-wider">
                          STEP {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-2">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-4">{step.description}</p>
                      <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        {step.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex items-center gap-2 text-sm text-neutral-500 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                          >
                            <CheckCircle
                              size={14}
                              strokeWidth={2.5}
                              className="text-brand-lime shrink-0"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="hidden md:flex flex-1 items-center justify-center p-2">
                      <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-300">
                        <LottieAnimation
                          variant={
                            index === 0
                              ? 'house-assembly'
                              : index === 1
                                ? 'location-pin'
                                : index === 2
                                  ? 'success-check'
                                  : index === 3
                                    ? 'owner-dashboard'
                                    : 'security-shield'
                          }
                          size="md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="py-16 md:py-24 bg-neutral-900/[0.02] border-y border-neutral-200/80 relative z-10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                The Hostel Ghar Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Built for Safety, Comfort &amp; Trust
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Everything you need to find a place that feels like home, backed by physical
                verification and direct communication.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="feature-card p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/80 hover:border-brand-lime/50 hover:shadow-medium transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center text-brand-black mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works for You */}
        <section className="py-16 md:py-24 bg-brand-black relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-lime text-sm font-semibold rounded-full mb-4">
                For Everyone
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                How It Works for You
              </h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Whether you&apos;re a traveler, hostel owner, or resident, we&apos;ve got you
                covered.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Traveler */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-lime/50 transition-colors">
                <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center text-brand-lime mb-4">
                  <Search size={18} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">For Travelers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Browse verified hostels across Nepal</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Filter by price, location & amenities</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Book instantly with confirmation</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Manage bookings from dashboard</span>
                  </li>
                </ul>
              </div>

              {/* Hostel Owner */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-lime/50 transition-colors">
                <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center text-brand-lime mb-4">
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">For Hostel Owners</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Create and manage hostel listings</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Track residents and occupancy</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Generate and track fee payments</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Handle leave requests easily</span>
                  </li>
                </ul>
              </div>

              {/* Resident */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-lime/50 transition-colors">
                <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center text-brand-lime mb-4">
                  <Users size={18} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">For Residents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>View hostel details and policies</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Apply for leave with tracking</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>View fee bills and payment status</span>
                  </li>
                  <li className="flex items-start gap-2 text-neutral-400 text-sm">
                    <CheckCircle
                      size={15}
                      strokeWidth={2.5}
                      className="text-brand-lime mt-0.5 flex-shrink-0"
                    />
                    <span>Get real-time notifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-brand-lime/10 to-transparent relative z-10 border-t border-neutral-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Join thousands of travelers and hostel owners who trust Hostel Ghar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300 hover:-translate-y-0.5 shadow-lime"
              >
                Create Free Account <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href="/hostels"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                Browse Hostels
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default HowItWorksPage;
