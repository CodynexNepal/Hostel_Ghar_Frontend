'use client';

import { Section, SectionHeader, CTABanner } from '@/components/ui/Section';
import {
  Search,
  MousePointerClick,
  Share2,
  Mail,
  FileText,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    title: 'Hostel Listing Optimization',
    description:
      'Maximize your hostel visibility with optimized listings that attract more travelers and bookings.',
    icon: <Search size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/20',
    iconColor: 'text-brand-black',
  },
  {
    title: 'Pay-per-click Advertising',
    description:
      'Targeted ad campaigns that put your hostel in front of travelers actively searching for accommodations.',
    icon: <MousePointerClick size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/15',
    iconColor: 'text-brand-black',
  },
  {
    title: 'Social Media Marketing',
    description:
      'Build your hostel brand and engage with travelers through strategic social media presence.',
    icon: <Share2 size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/20',
    iconColor: 'text-brand-black',
  },
  {
    title: 'Email Marketing',
    description:
      'Keep guests informed and engaged with newsletters, promotions, and personalized offers.',
    icon: <Mail size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/15',
    iconColor: 'text-brand-black',
  },
  {
    title: 'Content Creation',
    description:
      'Compelling visuals and stories that showcase your hostel experience and attract more guests.',
    icon: <FileText size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/20',
    iconColor: 'text-brand-black',
  },
  {
    title: 'Analytics & Insights',
    description:
      'Data-driven insights to understand your guests and improve your hostel performance.',
    icon: <BarChart3 size={28} strokeWidth={1.8} />,
    bgColor: 'bg-brand-lime/15',
    iconColor: 'text-brand-black',
  },
];

const logos = [
  {
    name: 'Amazon',
    path: 'M12.5 2C12.5 2 13.8 3.5 13.8 5.5C13.8 7.5 12.5 9 12.5 9M8.5 2C8.5 2 7.2 3.5 7.2 5.5C7.2 7.5 8.5 9 8.5 9M12.5 2C12.5 2 11.2 0.5 9.5 0.5C7.8 0.5 6.5 2 6.5 2',
  },
  {
    name: 'Dribbble',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z',
  },
  {
    name: 'HubSpot',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v.5c.5-.5 1.27-.5 2 .5V9h2v6z',
  },
  {
    name: 'Notion',
    path: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.454-.233 4.764 7.279V9.106l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 2.99.698l4.154 2.945c.608.467.793.514.793.981v16.378c0 .84-.327 1.027-1.214 1.073l-15.225.887c-.793.047-1.167-.093-1.588-.698l-3.036-3.878c-.467-.607-.653-1.073-.653-1.634V2.016c0-.653.327-1.027.935-.98z',
  },
  {
    name: 'Netflix',
    path: 'M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.058 4.85.058-2.8-7.998-5.053-14.617-8.25-23.596L5.398 0zm10.602 0v12.892L11.15 0h2.85l2 4.46V0h-1zM5.398 2.5L3 9.5h2.5l2.398-7H5.398zm10.602 7v7l2.5-7H16z',
  },
  {
    name: 'Zoom',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H7V8h4v8zm6 0h-4V8h4v8z',
  },
];

const Services = () => {
  return (
    <Section tone="white">
        {/* Trusted By Logos */}
        <div className="mb-16">
          <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-neutral-400 hover:text-brand-black transition-colors duration-300"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d={logo.path} />
                </svg>
                <span className="text-lg font-bold">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          eyebrow="Services"
          title="What We Offer"
          description="Comprehensive solutions to help your hostel stand out and attract more guests"
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-neutral-100 hover:border-brand-lime/50 bg-white hover:bg-brand-lime/5 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-5 ${service.iconColor}`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3">{service.title}</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">{service.description}</p>
              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black hover:text-brand-lime transition-colors">
                Learn More
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <CTABanner
          className="mt-14"
          variant="image"
          imageSrc="/images/static/hostel.jpg"
          imageAlt="Cozy hostel dormitory listed on Hostel Ghar"
          title="Let's make things happen"
          description="Contact us today to learn more about how our services can help your hostel grow and succeed online."
          primaryLabel="Get your free proposal"
          primaryHref="/contact"
        />
    </Section>
  );
};

export default Services;
