'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  Users,
  CreditCard,
  CalendarCheck,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  Play,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '500+', label: 'Hostels Listed', icon: <Building2 size={20} strokeWidth={1.8} /> },
  { value: '10K+', label: 'Happy Travelers', icon: <Users size={20} strokeWidth={1.8} /> },
  { value: '98%', label: 'Occupancy Rate', icon: <TrendingUp size={20} strokeWidth={1.8} /> },
  { value: '24/7', label: 'Support', icon: <Clock size={20} strokeWidth={1.8} /> },
];

const features = [
  {
    icon: <BarChart3 size={28} strokeWidth={1.5} />,
    title: 'Smart Dashboard',
    description: 'Track occupancy, revenue, and resident activity at a glance.',
    color: 'bg-brand-lime/20',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    title: 'Resident Management',
    description: 'Add, remove, and manage residents in real-time.',
    color: 'bg-blue-500/20',
  },
  {
    icon: <CreditCard size={28} strokeWidth={1.5} />,
    title: 'Fee Automation',
    description: 'Automatically generate monthly fee records.',
    color: 'bg-purple-500/20',
  },
  {
    icon: <CalendarCheck size={28} strokeWidth={1.5} />,
    title: 'Leave Management',
    description: 'Review and approve leave requests with one click.',
    color: 'bg-orange-500/20',
  },
  {
    icon: <FileText size={28} strokeWidth={1.5} />,
    title: 'Leave Policies',
    description: 'Create custom leave policies for your hostel.',
    color: 'bg-pink-500/20',
  },
  {
    icon: <Bell size={28} strokeWidth={1.5} />,
    title: 'Notifications',
    description: 'Real-time alerts for bookings, payments, and updates.',
    color: 'bg-cyan-500/20',
  },
];

const steps = [
  {
    number: '01',
    title: 'Register Hostel',
    description: 'Add your hostel details, photos, and amenities.',
    icon: <Building2 size={32} strokeWidth={1.5} />,
  },
  {
    number: '02',
    title: 'Set Up Policies',
    description: 'Configure room types, pricing, and fee structures.',
    icon: <Settings size={32} strokeWidth={1.5} />,
  },
  {
    number: '03',
    title: 'Add Residents',
    description: 'Invite residents or let them book directly.',
    icon: <Users size={32} strokeWidth={1.5} />,
  },
  {
    number: '04',
    title: 'Grow Business',
    description: 'Automate operations and focus on growth.',
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
  },
];

const testimonials = [
  {
    name: 'Rajesh Hamal',
    role: 'Owner, Himalayan Hostel',
    quote: 'Fee automation saves me 15 hours every month!',
    rating: 5,
  },
  {
    name: 'Priya Shrestha',
    role: 'Owner, Pokhara Backpackers',
    quote: 'I can track everything from my phone. Love it!',
    rating: 5,
  },
  {
    name: 'Bikram Thapa',
    role: 'Owner, Kathmandu Stay',
    quote: 'Occupancy increased by 40% since joining.',
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'For small hostels',
    features: ['Up to 20 residents', 'Basic dashboard', 'Fee tracking', 'Email support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: 'NPR 2,999',
    period: '/month',
    description: 'For growing hostels',
    features: [
      'Unlimited residents',
      'Advanced analytics',
      'Auto fee generation',
      'Leave management',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large chains',
    features: ['Everything in Pro', 'Multi-hostel', 'API access', 'Dedicated manager'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const ForOwnersPage = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
      gsap.fromTo(
        '.hero-stats',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
        '.step-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>For Hostel Owners - Hostel Ghar</title>
        <meta name="description" content="Manage your hostel smarter with Hostel Ghar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white">
        <Header />
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc] pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/20 rounded-full mb-6">
                  <Building2 size={16} strokeWidth={2} className="text-brand-black" />
                  <span className="text-sm font-semibold text-brand-black">For Hostel Owners</span>
                </div>
                <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black tracking-tight mb-6">
                  Manage Your Hostel{' '}
                  <span className="relative inline-block ml-2">
                    <span className="relative z-10">Smarter</span>
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-brand-lime/50 -z-0 rounded-sm"></span>
                  </span>
                </h1>
                <p className="hero-subtitle text-lg md:text-xl text-neutral-600 mb-8 max-w-xl">
                  Automate operations, track fees, manage residents, and grow your business.
                </p>
                <div className="hero-cta flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300 hover:-translate-y-0.5 shadow-lime"
                  >
                    Start Free Trial <ArrowRight size={18} strokeWidth={2} />
                  </Link>
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-black font-semibold rounded-xl border border-neutral-200 hover:border-brand-lime transition-all duration-300">
                    <Play size={18} strokeWidth={2} /> Watch Demo
                  </button>
                </div>
              </div>
            </div>
            <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-2xl border border-neutral-100 shadow-soft"
                >
                  <div className="w-10 h-10 bg-brand-lime/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-brand-black">
                    {stat.icon}
                  </div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-black">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section ref={featuresRef} className="py-20 md:py-28 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Powerful Features
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Everything You Need
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="feature-card p-6 bg-white rounded-2xl border border-neutral-100 hover:border-brand-lime/50 hover:shadow-medium transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-brand-black mb-5`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section ref={stepsRef} className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Simple Setup
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Get Started in 4 Steps
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`step-item relative p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${activeStep === index ? 'border-brand-lime shadow-lime' : 'border-neutral-100 hover:border-brand-lime/50'}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="absolute top-4 right-4 text-4xl font-extrabold text-brand-black/5">
                    {step.number}
                  </span>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${activeStep === index ? 'bg-brand-lime text-brand-black' : 'bg-neutral-100 text-neutral-600'}`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600">{step.description}</p>
                  {index < steps.length - 1 && (
                    <ChevronRight
                      size={20}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 text-brand-lime hidden lg:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 md:py-28 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Loved by Owners
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-6 bg-white rounded-2xl border border-neutral-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#B9FF66" stroke="#B9FF66" />
                    ))}
                  </div>
                  <p className="text-neutral-600 italic mb-5">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-lime/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-black">
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black text-sm">{testimonial.name}</p>
                      <p className="text-xs text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Simple Pricing
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${plan.popular ? 'bg-brand-black text-white border-brand-black scale-105 shadow-hard' : 'bg-white border-neutral-100 hover:border-brand-lime/50'}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-lime text-brand-black text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3
                    className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-brand-black'}`}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-3xl font-extrabold ${plan.popular ? 'text-brand-lime' : 'text-brand-black'}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-6 ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}
                  >
                    {plan.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} strokeWidth={2.5} className="text-brand-lime" />
                        <span className={plan.popular ? 'text-neutral-300' : 'text-neutral-600'}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${plan.popular ? 'bg-brand-lime text-brand-black hover:bg-brand-lime/85' : 'bg-brand-lime/10 text-brand-black hover:bg-brand-lime/20'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 md:py-28 bg-brand-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Ready to Transform Your Hostel?
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Join 500+ hostel owners who trust Hostel Ghar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300 hover:-translate-y-0.5 shadow-lime"
              >
                Start Free Trial <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ForOwnersPage;
