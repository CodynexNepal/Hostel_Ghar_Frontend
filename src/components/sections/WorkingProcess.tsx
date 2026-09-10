'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'During the initial consultation, we will discuss your hostel goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.',
  },
  {
    number: '02',
    title: 'Research',
    description:
      'After the consultation, we will conduct thorough research to identify your target audience, competitors, and industry trends. This will help us develop a comprehensive strategy to achieve your hostel goals.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'Once the research is complete, we will begin implementing the strategy. This may include optimizing your listings, creating content, and launching marketing campaigns.',
  },
  {
    number: '04',
    title: 'Optimization',
    description:
      'After the initial implementation, we will continuously monitor and optimize your marketing efforts to ensure maximum results and bookings for your hostel.',
  },
  {
    number: '05',
    title: 'Reporting',
    description:
      'Throughout the process, we will provide regular reports on the performance of your marketing campaigns. This will allow you to track progress and measure success.',
  },
  {
    number: '06',
    title: 'Improvement',
    description:
      'Based on the data and insights gathered from the reports, we will make recommendations for further improvement and growth of your hostel business.',
  },
];

const AccordionItem = ({
  step,
  isOpen,
  onToggle,
}: {
  step: (typeof steps)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle();

    if (contentRef.current) {
      if (!isOpen) {
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
        });
      }
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isOpen ? 0 : 180,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'bg-brand-lime/15 border-brand-lime/50 shadow-lime'
          : 'bg-[#f8f8f8] border-neutral-100 hover:bg-brand-lime/10 hover:border-brand-lime/30'
      }`}
    >
      <button
        onClick={handleToggle}
        className="w-full p-5 md:p-6 flex items-center gap-4 text-left"
      >
        <span
          className={`text-3xl md:text-4xl font-extrabold transition-colors duration-300 ${
            isOpen ? 'text-brand-black' : 'text-brand-black/25'
          }`}
        >
          {step.number}
        </span>
        <h3
          className={`text-lg md:text-xl font-bold text-brand-black flex-1 transition-colors duration-300 ${
            isOpen ? 'text-brand-black' : ''
          }`}
        >
          {step.title}
        </h3>
        <div
          ref={iconRef}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-brand-lime text-brand-black' : 'bg-neutral-200 text-neutral-500'
          }`}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <div className="md:ml-14">
            <p className="text-neutral-600 leading-relaxed">{step.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkingProcess = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section tone="white" container="md">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Our Process"
          title="How We Work"
          description="Step-by-step guide to achieving your hostel business goals"
        />

        {/* Accordion Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <AccordionItem
              key={index}
              step={step}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
    </Section>
  );
};

export default WorkingProcess;
