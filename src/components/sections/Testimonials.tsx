'use client';

import { Star } from 'lucide-react';
import Carousel from '@/components/ui/Carousel';

const testimonials = [
  {
    name: 'Gupta Patel',
    role: 'Hostel Owner, Pokhara',
    quote:
      'Hostel Ghar has transformed our booking rates. Their team is professional, responsive, and truly cares about our success. We have seen a significant increase in online visibility and bookings.',
    rating: 5,
  },
  {
    name: 'Sara Johnson',
    role: 'Travel Blogger',
    quote:
      'As a frequent traveler, I rely on Hostel Ghar to find the best accommodations. Their platform is easy to use and always has the best options available. Highly recommended!',
    rating: 5,
  },
  {
    name: 'John Smith',
    role: 'Marketing Director, Himalayan Hostels',
    quote:
      'Working with Hostel Ghar has been a game-changer for our business. Their SEO and marketing expertise helped us reach more travelers and increase our bookings significantly.',
    rating: 5,
  },
  {
    name: 'Jane Doe',
    role: 'CEO, Kathmandu Stays',
    quote:
      'The team at Hostel Ghar is knowledgeable and always goes above and beyond. They helped us optimize our listings and create a strong online presence. Excellent service!',
    rating: 5,
  },
  {
    name: 'Alice Johnson',
    role: 'Owner, Mountain View Hostel',
    quote:
      'I have been using Hostel Ghar for over a year now and I am very impressed with their professionalism. They helped me increase my online visibility and generate more bookings.',
    rating: 5,
  },
  {
    name: 'Bob Brown',
    role: 'Director, Everest Base Camp Lodge',
    quote:
      'Hostel Ghar made a huge difference in our online presence. They are knowledgeable, responsive, and truly care about the success of our business. Highly recommended!',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-brand-lime/20 text-brand-black text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Hear from hostel owners and travelers who have experienced our services
          </p>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap={24}
          autoPlay={true}
          autoPlayInterval={5000}
          showDots={true}
          showArrows={true}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-[#f8f8f8] rounded-2xl border border-neutral-100 hover:border-brand-lime/50 transition-all duration-300 h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#B9FF66" stroke="#B9FF66" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-600 leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-lime/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-brand-black">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-brand-black">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
