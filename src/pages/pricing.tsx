'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import LottieAnimation from '@/components/lottie/LottieAnimation';
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
import {
  getSubscriptionPlans,
  DEFAULT_SUBSCRIPTION_PLANS,
  type SubscriptionPlan,
} from '@/lib/api/hostels';

gsap.registerPlugin(ScrollTrigger);

type BillingPeriod = 'monthly' | 'annual';

const getPlanIcon = (id: string) => {
  switch (id.toUpperCase()) {
    case 'FREE':
      return <Zap size={24} strokeWidth={1.5} />;
    case 'BASIC':
      return <Shield size={24} strokeWidth={1.5} />;
    case 'PRO':
      return <Sparkles size={24} strokeWidth={1.5} />;
    case 'ENTERPRISE':
      return <Building2 size={24} strokeWidth={1.5} />;
    default:
      return <Zap size={24} strokeWidth={1.5} />;
  }
};

const comparisonRows = [
  {
    feature: 'Residents Capacity',
    getValue: (p: SubscriptionPlan) =>
      p.limits?.maxResidents ? `Up to ${p.limits.maxResidents}` : 'Unlimited',
  },
  {
    feature: 'Hostels Supported',
    getValue: (p: SubscriptionPlan) =>
      p.featureFlags?.multipleHostels ? 'Multiple Hostels' : '1 Hostel',
  },
  {
    feature: 'Basic Dashboard',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.basicDashboard ?? true),
  },
  {
    feature: 'Basic Hostel Profile',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.basicHostelProfile ?? true),
  },
  {
    feature: 'Room Management',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.roomManagement ?? true),
  },
  {
    feature: 'Staff Management',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.staffManagement),
  },
  {
    feature: 'Reports & Analytics',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.reportsAndAnalytics),
  },
  {
    feature: 'Basic Payments',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.basicPayments),
  },
  {
    feature: 'Expenses Tracking',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.expensesTracking),
  },
  {
    feature: 'Advanced Analytics',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.advancedAnalytics),
  },
  {
    feature: 'Reports & Exports',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.reportsAndExports),
  },
  {
    feature: 'Invoices & Reminders',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.invoicesAndReminders),
  },
  {
    feature: 'Advanced Administration',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.advancedAdministration),
  },
  {
    feature: 'Priority Support',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.prioritySupport),
  },
  {
    feature: 'Custom Integrations',
    getValue: (p: SubscriptionPlan) => Boolean(p.featureFlags?.customIntegrations),
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
  const [plans, setPlans] = useState<SubscriptionPlan[]>(DEFAULT_SUBSCRIPTION_PLANS);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Fetch live backend subscription plans
  useEffect(() => {
    let isMounted = true;
    getSubscriptionPlans()
      .then((res) => {
        if (isMounted && res?.data && res.data.length > 0) {
          setPlans(res.data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load subscription plans from backend:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getPrice = (plan: SubscriptionPlan) => {
    if (plan.price === 0) return { amount: 0, display: 'Free' };
    const price =
      billingPeriod === 'monthly' ? plan.price : Math.round((plan.price * 12 * 0.83) / 12);
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
  }, [plans]);

  return (
    <>
      <Head>
        <title>Pricing - Hostel Ghar</title>
        <meta name="description" content="Simple, transparent pricing for hostel management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-transparent">
        <Header />
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-lime/10 via-transparent to-transparent pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-lime/20 rounded-full mb-6">
              <Shield size={16} strokeWidth={2} className="text-brand-black" />
              <span className="text-sm font-semibold text-brand-black">
                Simple, Transparent Pricing
              </span>
            </div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black tracking-tight mb-6 overflow-hidden">
              <span className="inline-block animate-text-reveal">
                Plans That Grow{' '}
                <span className="relative inline-block ml-2">
                  <span className="relative z-10">With You</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-brand-lime/50 -z-0 rounded-sm"></span>
                </span>
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

        <section ref={pricingRef} className="py-12 md:py-16 bg-transparent -mt-8 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => {
                const price = getPrice(plan);
                const isPopular =
                  plan.badge?.toLowerCase() === 'popular' || plan.id.toUpperCase() === 'PRO';
                const isEnterprise = plan.id.toUpperCase() === 'ENTERPRISE';
                const icon = getPlanIcon(plan.id);

                return (
                  <div
                    key={plan.id}
                    className={`pricing-card relative p-7 rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between ${
                      isPopular
                        ? 'bg-brand-black text-white border-brand-black scale-[1.02] shadow-hard'
                        : 'bg-white border-neutral-100 hover:border-brand-lime/50 hover:shadow-medium'
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-lime text-brand-black text-xs font-extrabold uppercase tracking-wider rounded-full shadow-lime">
                        {plan.badge}
                      </span>
                    )}
                    <div>
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
                          isPopular
                            ? 'bg-brand-lime/20 text-brand-lime'
                            : 'bg-brand-lime/20 text-brand-black'
                        }`}
                      >
                        {icon}
                      </div>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          isPopular ? 'text-white' : 'text-brand-black'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm mb-6 ${
                          isPopular ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                      <div className="flex items-baseline gap-1 mb-6">
                        {price.amount === 0 ? (
                          <span
                            className={`text-4xl font-extrabold ${
                              isPopular ? 'text-brand-lime' : 'text-brand-black'
                            }`}
                          >
                            Free
                          </span>
                        ) : (
                          <>
                            <span
                              className={`text-3xl lg:text-4xl font-extrabold ${
                                isPopular ? 'text-brand-lime' : 'text-brand-black'
                              }`}
                            >
                              {price.display}
                            </span>
                            <span
                              className={`text-sm ${
                                isPopular ? 'text-neutral-400' : 'text-neutral-500'
                              }`}
                            >
                              /mo
                            </span>
                          </>
                        )}
                      </div>
                      <Link
                        href={isEnterprise ? '/contact' : '/register'}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all mb-8 ${
                          isPopular
                            ? 'bg-brand-lime text-brand-black hover:bg-brand-lime/85'
                            : 'bg-brand-lime/10 text-brand-black hover:bg-brand-lime/20'
                        }`}
                      >
                        {plan.buttonText || (isEnterprise ? 'Contact Sales' : 'Get Started')}{' '}
                        <ArrowRight size={16} strokeWidth={2} />
                      </Link>
                      <ul className="space-y-3">
                        {plan.features.map((featureName) => (
                          <li key={featureName} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-brand-lime/20 flex-shrink-0">
                              <Check size={12} strokeWidth={3} className="text-brand-black" />
                            </div>
                            <span
                              className={`text-sm ${isPopular ? 'text-white' : 'text-brand-black'}`}
                            >
                              {featureName}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#f8f8f8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      {plans.map((p) => {
                        const isPopular =
                          p.badge?.toLowerCase() === 'popular' || p.id.toUpperCase() === 'PRO';
                        return (
                          <th
                            key={p.id}
                            className={`p-5 text-center font-bold text-brand-black ${
                              isPopular ? 'bg-brand-lime/15' : ''
                            }`}
                          >
                            <span className="block text-base">{p.name}</span>
                            <span className="block text-xs font-normal text-neutral-500 mt-0.5">
                              {p.formattedPrice}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-neutral-50/50' : ''}>
                        <td className="p-5 text-sm text-neutral-700 font-semibold">
                          {row.feature}
                        </td>
                        {plans.map((p) => {
                          const isPopular =
                            p.badge?.toLowerCase() === 'popular' || p.id.toUpperCase() === 'PRO';
                          const val = row.getValue(p);
                          return (
                            <td
                              key={p.id}
                              className={`p-5 text-center ${isPopular ? 'bg-brand-lime/5' : ''}`}
                            >
                              {typeof val === 'boolean' ? (
                                val ? (
                                  <Check
                                    size={18}
                                    strokeWidth={2.5}
                                    className="mx-auto text-emerald-600"
                                  />
                                ) : (
                                  <X
                                    size={18}
                                    strokeWidth={2}
                                    className="mx-auto text-neutral-300"
                                  />
                                )
                              ) : (
                                <span className="text-sm font-semibold text-brand-black">
                                  {val}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-transparent">
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

        <section ref={faqRef} className="py-20 md:py-28 bg-neutral-900/[0.02]">
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
            <LottieAnimation variant="success-check" size="lg" className="mx-auto mb-6" />
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
