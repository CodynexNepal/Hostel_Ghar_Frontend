'use client';

import { Link } from 'lucide-react';
import Carousel from '@/components/ui/Carousel';

const teamMembers = [
  {
    name: 'Ram Sharma',
    role: 'CEO and Founder',
    bio: '10+ years of experience in hospitality marketing. Expertise in SEO, PPC, and content strategy for hostels.',
    avatar: 'RS',
  },
  {
    name: 'Sita Thapa',
    role: 'Director of Operations',
    bio: '7+ years of experience in project management and team leadership. Strong organizational and communication skills.',
    avatar: 'ST',
  },
  {
    name: 'Hari Prasad',
    role: 'Senior SEO Specialist',
    bio: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization.',
    avatar: 'HP',
  },
  {
    name: 'Gita Devi',
    role: 'Social Media Manager',
    bio: '4+ years of experience in social media marketing. Proficient in creating engaging content and building community.',
    avatar: 'GD',
  },
  {
    name: 'Bikash KC',
    role: 'Content Creator',
    bio: '3+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for travel industry.',
    avatar: 'BK',
  },
  {
    name: 'Anita Gurung',
    role: 'Analytics Manager',
    bio: '5+ years of experience in data analysis and reporting. Expert in tracking campaign performance and ROI optimization.',
    avatar: 'AG',
  },
];

const Team = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight">
            Meet Our Experts
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            The skilled and experienced team behind our successful hostel marketing strategies
          </p>
        </div>

        {/* Team Carousel */}
        <Carousel
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap={24}
          showDots={true}
          showArrows={true}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-neutral-100 hover:border-brand-lime/50 transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-brand-lime/20 rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-black">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-black">{member.name}</h3>
                  <p className="text-sm text-neutral-500 font-medium">{member.role}</p>
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed mb-5">{member.bio}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-brand-black transition-colors group"
              >
                <Link
                  size={18}
                  strokeWidth={2}
                  className="group-hover:text-brand-lime transition-colors"
                />
                LinkedIn
              </a>
            </div>
          ))}
        </Carousel>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3.5 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/90 transition-all duration-300 hover:-translate-y-0.5">
            See all team members
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
