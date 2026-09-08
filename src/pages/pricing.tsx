'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  X,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  Building2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type BillingPeriod = 'monthly' | 'annual';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small hostels just getting started',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: 'Up to 20 residents', included: true },
      { name: 'Basic dashboard', included: true },
      { name: 'Fee tracking', included: true },
      { name: 'Email support', included: true },
      { name: 'Leave management', included: false },
      { name: 'Automated billing', included: false },
      { name: 'Custom branding', included: false },
      { name: 'API access', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    icon: <Zap size={24} strokeWidth={1.5} />,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing hostels that need more power',
    monthlyPrice: 2999,
    annualPrice: 29990,
    features: [
      { name: 'Unlimited residents', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Automated fee generation', included: true },
      { name: 'Leave management', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom branding', included: true },
      { name: 'API access', included: false },
      { name: 'Dedicated manager', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
    icon: <Sparkles size={24} strokeWidth={1.5} />,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large hostel chains and organizations',
    monthlyPrice: -1,
    annualPrice: -1,
    features: [
      { name: 'Everything in Professional', included: true },
      { name: 'Multi-hostel management', included: true },
      { name: 'Full API access', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'SLA guarantee', included: true },
      { name: 'White-label solution', included: true },
      { name: 'On-premise deployment', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: <Building2 size={24} strokeWidth={1.5} />,
  },
];

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and bank transfers.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Cancel anytime from your account settings. No long-term contracts.',
  },
  {
    question: 'Do you offer annual discounts?',
    answer: 'Yes! Annual billing saves you 17% - equivalent to 2 months free.',
  },
  {
    question: 'Is my data secure?',
    answer: 'We use enterprise-grade security with encryption and SOC 2 compliance.',
  },
];

const testimonials = [
  {
    quote: 'The Professional plan paid for itself in the first week.',
    author: 'Rajesh Hamal',
    role: 'Owner, Himalayan Hostel',
    rating: 5,
  },
  {
    quote: 'Best investment for our hostel chain. Exactly what we needed.',
    author: 'Priya Shrestha',
    role: 'CEO, Pokhara Stays',
    rating: 5,
  },
  {
    quote: 'Customer support is incredible. They helped us migrate seamlessly.',
    author: 'Bikram Thapa',
    role: 'Manager, Kathmandu Hostels',
    rating: 5,
  },
];

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const getPrice = (plan: (typeof pricingPlans)[0]) => {
    if (plan.monthlyPrice === 0) return { amount: 0, display: 'Free' };
    if (plan.monthlyPrice === -1) return { amount: -1, display: 'Custom' };
    const price =
      billingPeriod === 'monthly' ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
    return { amount: price, display: `NPR ${price.toLocaleString()}` };
  };

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
        '.pricing-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.faq-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 85%',
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
        <title>Pricing - Hostel Ghar</title>
        <meta name="description" content="Simple, transparent pricing for hostel management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white">
        <Header />
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc] pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/20 rounded-full mb-6">
              <Shield size={16} strokeWidth={2} className="text-brand-black" />
              <span className="text-sm font-semibold text-brand-black">
                Simple, Transparent Pricing
              </span>
            </div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black tracking-tight mb-6">
              Plans That Grow{' '}
              <span className="relative inline-block ml-3">
                <span className="relative z-10">With You</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-brand-lime/50 -z-0 rounded-sm"></span>
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
              Start free and scale as your hostel grows. No hidden fees.
            </p>
            <div className="inline-flex items-center gap-4 p-1.5 bg-white rounded-2xl shadow-soft border border-neutral-100">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${billingPeriod === 'monthly' ? 'bg-brand-lime text-brand-black shadow-lime' : 'text-neutral-600'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${billingPeriod === 'annual' ? 'bg-brand-lime text-brand-black shadow-lime' : 'text-neutral-600'}`}
              >
                Annual{' '}
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>
        </section>

        <section ref={pricingRef} className="py-12 md:py-16 bg-white -mt-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {pricingPlans.map((plan) => {
                const price = getPrice(plan);
                return (
                  <div
                    key={plan.id}
                    className={`pricing-card relative p-8 rounded-3xl border-2 transition-all duration-300 ${plan.popular ? 'bg-brand-black text-white border-brand-black scale-[1.02] shadow-hard' : 'bg-white border-neutral-100 hover:border-brand-lime/50 hover:shadow-medium'}`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-lime text-brand-black text-sm font-bold rounded-full shadow-lime">
                        Most Popular
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${plan.popular ? 'bg-brand-lime/20 text-brand-lime' : 'bg-brand-lime/20 text-brand-black'}`}
                    >
                      {plan.icon}
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-brand-black'}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm mb-6 ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}
                    >
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1 mb-6">
                      {price.amount === 0 ? (
                        <span
                          className={`text-4xl font-extrabold ${plan.popular ? 'text-brand-lime' : 'text-brand-black'}`}
                        >
                          Free
                        </span>
                      ) : price.amount === -1 ? (
                        <span
                          className={`text-4xl font-extrabold ${plan.popular ? 'text-brand-lime' : 'text-brand-black'}`}
                        >
                          Custom
                        </span>
                      ) : (
                        <>
                          <span
                            className={`text-4xl font-extrabold ${plan.popular ? 'text-brand-lime' : 'text-brand-black'}`}
                          >
                            {price.display}
                          </span>
                          <span
                            className={`text-sm ${plan.popular ? 'text-neutral-400' : 'text-neutral-500'}`}
                          >
                            /month
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={plan.id === 'enterprise' ? '/contact' : '/register'}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all mb-8 ${plan.popular ? 'bg-brand-lime text-brand-black hover:bg-brand-lime/85' : 'bg-brand-lime/10 text-brand-black hover:bg-brand-lime/20'}`}
                    >
                      {plan.cta} <ArrowRight size={16} strokeWidth={2} />
                    </Link>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f.name} className="flex items-center gap-3">
                          {f.included ? (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-brand-lime/20">
                              <Check size={12} strokeWidth={3} className="text-brand-black" />
                            </div>
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/10' : 'bg-neutral-100'}`}
                            >
                              <X
                                size={12}
                                strokeWidth={3}
                                className={plan.popular ? 'text-neutral-500' : 'text-neutral-400'}
                              />
                            </div>
                          )}
                          <span
                            className={`text-sm ${f.included ? (plan.popular ? 'text-white' : 'text-brand-black') : plan.popular ? 'text-neutral-500' : 'text-neutral-400'}`}
                          >
                            {f.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#f8f8f8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Compare Plans
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Feature Comparison
              </h2>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="text-left p-5 font-bold text-brand-black">Features</th>
                      <th className="p-5 text-center font-bold text-brand-black">Starter</th>
                      <th className="p-5 text-center font-bold text-brand-black bg-brand-lime/10">
                        Professional
                      </th>
                      <th className="p-5 text-center font-bold text-brand-black">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: 'Residents',
                        starter: '20',
                        professional: 'Unlimited',
                        enterprise: 'Unlimited',
                      },
                      { feature: 'Dashboard', starter: true, professional: true, enterprise: true },
                      {
                        feature: 'Fee Tracking',
                        starter: true,
                        professional: true,
                        enterprise: true,
                      },
                      {
                        feature: 'Automated Billing',
                        starter: false,
                        professional: true,
                        enterprise: true,
                      },
                      {
                        feature: 'Leave Management',
                        starter: false,
                        professional: true,
                        enterprise: true,
                      },
                      {
                        feature: 'Analytics',
                        starter: 'Basic',
                        professional: 'Advanced',
                        enterprise: 'Custom',
                      },
                      {
                        feature: 'Support',
                        starter: 'Email',
                        professional: 'Priority',
                        enterprise: 'Dedicated',
                      },
                      {
                        feature: 'API Access',
                        starter: false,
                        professional: false,
                        enterprise: true,
                      },
                      {
                        feature: 'Multi-hostel',
                        starter: false,
                        professional: false,
                        enterprise: true,
                      },
                    ].map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-neutral-50/50' : ''}>
                        <td className="p-5 text-sm text-neutral-600">{row.feature}</td>
                        <td className="p-5 text-center">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check
                                size={18}
                                strokeWidth={2.5}
                                className="mx-auto text-brand-lime"
                              />
                            ) : (
                              <X size={18} strokeWidth={2} className="mx-auto text-neutral-300" />
                            )
                          ) : (
                            <span className="text-sm text-neutral-600">{row.starter}</span>
                          )}
                        </td>
                        <td className="p-5 text-center bg-brand-lime/5">
                          {typeof row.professional === 'boolean' ? (
                            row.professional ? (
                              <Check
                                size={18}
                                strokeWidth={2.5}
                                className="mx-auto text-brand-lime"
                              />
                            ) : (
                              <X size={18} strokeWidth={2} className="mx-auto text-neutral-300" />
                            )
                          ) : (
                            <span className="text-sm text-neutral-600">{row.professional}</span>
                          )}
                        </td>
                        <td className="p-5 text-center">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? (
                              <Check
                                size={18}
                                strokeWidth={2.5}
                                className="mx-auto text-brand-lime"
                              />
                            ) : (
                              <X size={18} strokeWidth={2} className="mx-auto text-neutral-300" />
                            )
                          ) : (
                            <span className="text-sm text-neutral-600">{row.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Trusted by Hostel Owners
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.author}
                  className="p-6 bg-[#f8f8f8] rounded-2xl border border-neutral-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#B9FF66" stroke="#B9FF66" />
                    ))}
                  </div>
                  <p className="text-neutral-600 italic mb-5">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-lime/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-black">
                        {t.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black text-sm">{t.author}</p>
                      <p className="text-xs text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={faqRef} className="py-20 md:py-28 bg-[#f8f8f8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="faq-item bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-brand-black pr-4">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      className={`text-neutral-400 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-48 pb-6' : 'max-h-0'}`}
                  >
                    <p className="px-6 text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-brand-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/20 rounded-full mb-6">
              <Users size={16} strokeWidth={2} className="text-brand-lime" />
              <span className="text-sm font-semibold text-brand-lime">Join 500+ Hostels</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
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
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default PricingPage;
