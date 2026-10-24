'use client';

import { ArrowUpRight } from 'lucide-react';
import Carousel from '@/components/ui/Carousel';
import { Section, SectionHeader } from '@/components/ui/Section';
import { HostelImage } from '@/components/ui/Media';

const caseStudies = [
  {
    title: 'Mountain View Hostel',
    description:
      'For a local mountain hostel, we implemented a targeted SEO campaign that resulted in a 50% increase in website traffic and a 25% increase in bookings.',
    stats: [
      { value: '50%', label: 'Traffic Increase' },
      { value: '25%', label: 'More Bookings' },
    ],
  },
  {
    title: 'Himalayan Retreat',
    description:
      'For a boutique hostel chain, we developed a social media strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.',
    stats: [
      { value: '200%', label: 'Organic Traffic' },
      { value: '1st', label: 'Page Ranking' },
    ],
  },
  {
    title: 'Kathmandu Backpackers',
    description:
      'For a popular city hostel, we created a content marketing campaign that increased followers by 25% and generated a 20% increase in direct bookings.',
    stats: [
      { value: '25%', label: 'More Followers' },
      { value: '20%', label: 'Direct Bookings' },
    ],
  },
  {
    title: 'Pokhara Paradise',
    description:
      'We helped this lakeside hostel achieve a 150% increase in direct bookings through strategic social media marketing and influencer partnerships.',
    stats: [
      { value: '150%', label: 'Direct Bookings' },
      { value: '40%', label: 'Repeat Guests' },
    ],
  },
  {
    title: 'Everest Base Camp Lodge',
    description:
      'Our comprehensive digital strategy helped this trekking lodge achieve top 3 rankings for all major keywords in their region.',
    stats: [
      { value: '300%', label: 'Organic Traffic' },
      { value: 'Top 3', label: 'Keyword Rankings' },
    ],
  },
  {
    title: 'Chitwan Jungle Hostel',
    description:
      'Through targeted PPC campaigns, this wildlife hostel saw a 75% increase in peak season bookings within just 3 months.',
    stats: [
      { value: '75%', label: 'Peak Bookings' },
      { value: '3mo', label: 'Time to Results' },
    ],
  },
];

const CaseStudies = () => {
  return (
    <Section tone="gray">
      {/* Section Header */}
      <SectionHeader
        eyebrow="Case Studies"
        title="Real Success Stories"
        description="Explore real-life examples of how we've helped hostels grow their online presence"
      />

      {/* Case Studies Carousel */}
      <Carousel
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap={24}
        showDots={true}
        showArrows={true}
      >
        {caseStudies.map((study, index) => (
          <div
            key={index}
            className="group overflow-hidden bg-white rounded-2xl border border-neutral-100 hover:border-brand-lime/50 transition-all duration-300 h-full"
          >
            <HostelImage
              src="/images/static/hostel.jpg"
              alt={`${study.title} — hostel listed on Hostel Ghar`}
              aspect="video"
              rounded="none"
              zoomOnHover
              objectPosition={index % 2 === 0 ? 'center 30%' : 'center 70%'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            >
              <div className="flex items-start justify-between p-4">
                <span className="px-3 py-1.5 rounded-full bg-brand-black/80 backdrop-blur text-white text-xs font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-brand-lime text-brand-black text-xs font-bold">
                  {study.stats[0]?.value} {study.stats[0]?.label}
                </span>
              </div>
            </HostelImage>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-black mb-3">{study.title}</h3>
              <p className="text-neutral-600 leading-relaxed mb-5">{study.description}</p>

              <div className="flex gap-6 mb-5">
                {study.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <p className="text-2xl font-extrabold text-brand-black">{stat.value}</p>
                    <p className="text-xs text-neutral-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black hover:gap-2.5 transition-all duration-300">
                Read More
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </Section>
  );
};

export default CaseStudies;
