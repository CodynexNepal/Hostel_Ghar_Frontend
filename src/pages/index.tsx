import Head from 'next/head';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Services from '@/components/sections/Services';
import CaseStudies from '@/components/sections/CaseStudies';
import WorkingProcess from '@/components/sections/WorkingProcess';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

const HostelIllustration = () => (
  <svg
    viewBox="0 0 500 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-md mx-auto"
  >
    {/* Background Circle */}
    <circle cx="250" cy="200" r="180" fill="#B9FF66" fillOpacity="0.15" />
    <circle cx="250" cy="200" r="140" fill="#B9FF66" fillOpacity="0.1" />

    {/* Mountains */}
    <path
      d="M80 280 L180 140 L280 280 Z"
      fill="#B9FF66"
      fillOpacity="0.3"
      stroke="#010101"
      strokeWidth="2"
    />
    <path
      d="M150 280 L280 100 L410 280 Z"
      fill="#B9FF66"
      fillOpacity="0.5"
      stroke="#010101"
      strokeWidth="2"
    />
    <path
      d="M220 280 L320 160 L420 280 Z"
      fill="#B9FF66"
      fillOpacity="0.4"
      stroke="#010101"
      strokeWidth="2"
    />

    {/* Snow Caps */}
    <path
      d="M250 110 L280 100 L310 130 L280 140 Z"
      fill="#FFFFFF"
      stroke="#010101"
      strokeWidth="1.5"
    />
    <path
      d="M160 150 L180 140 L200 160 L180 170 Z"
      fill="#FFFFFF"
      stroke="#010101"
      strokeWidth="1.5"
    />

    {/* Hostel Building */}
    <rect
      x="180"
      y="220"
      width="140"
      height="100"
      fill="#FFFFFF"
      stroke="#010101"
      strokeWidth="2.5"
      rx="4"
    />

    {/* Roof */}
    <path d="M170 220 L250 170 L330 220 Z" fill="#010101" stroke="#010101" strokeWidth="2" />

    {/* Door */}
    <rect
      x="230"
      y="260"
      width="40"
      height="60"
      fill="#B9FF66"
      stroke="#010101"
      strokeWidth="2"
      rx="2"
    />
    <circle cx="260" cy="290" r="3" fill="#010101" />

    {/* Windows */}
    <rect
      x="195"
      y="240"
      width="25"
      height="25"
      fill="#B9FF66"
      fillOpacity="0.6"
      stroke="#010101"
      strokeWidth="1.5"
      rx="2"
    />
    <rect
      x="280"
      y="240"
      width="25"
      height="25"
      fill="#B9FF66"
      fillOpacity="0.6"
      stroke="#010101"
      strokeWidth="1.5"
      rx="2"
    />

    {/* Window Cross Pattern */}
    <line x1="207.5" y1="240" x2="207.5" y2="265" stroke="#010101" strokeWidth="1" />
    <line x1="195" y1="252.5" x2="220" y2="252.5" stroke="#010101" strokeWidth="1" />
    <line x1="292.5" y1="240" x2="292.5" y2="265" stroke="#010101" strokeWidth="1" />
    <line x1="280" y1="252.5" x2="305" y2="252.5" stroke="#010101" strokeWidth="1" />

    {/* Flag on Roof */}
    <line x1="250" y1="170" x2="250" y2="145" stroke="#010101" strokeWidth="2" />
    <path d="M250 145 L275 152 L250 160 Z" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />

    {/* Trees */}
    <g transform="translate(100, 240)">
      <rect x="8" y="30" width="6" height="20" fill="#010101" />
      <circle cx="11" cy="20" r="15" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />
    </g>
    <g transform="translate(130, 250)">
      <rect x="8" y="25" width="5" height="15" fill="#010101" />
      <circle cx="10.5" cy="17" r="12" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />
    </g>
    <g transform="translate(350, 245)">
      <rect x="8" y="28" width="6" height="18" fill="#010101" />
      <circle cx="11" cy="18" r="14" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />
    </g>
    <g transform="translate(380, 255)">
      <rect x="8" y="22" width="5" height="13" fill="#010101" />
      <circle cx="10.5" cy="15" r="10" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />
    </g>

    {/* Clouds */}
    <g fill="#FFFFFF" stroke="#010101" strokeWidth="1">
      <ellipse cx="80" cy="80" rx="25" ry="12" />
      <ellipse cx="100" cy="75" rx="20" ry="10" />
      <ellipse cx="420" cy="90" rx="22" ry="10" />
      <ellipse cx="440" cy="85" rx="18" ry="8" />
    </g>

    {/* Sun */}
    <circle cx="420" cy="60" r="25" fill="#B9FF66" stroke="#010101" strokeWidth="1.5" />
    <g stroke="#010101" strokeWidth="2" strokeLinecap="round">
      <line x1="420" y1="25" x2="420" y2="15" />
      <line x1="420" y1="95" x2="420" y2="105" />
      <line x1="385" y1="60" x2="375" y2="60" />
      <line x1="465" y1="60" x2="475" y2="60" />
      <line x1="395" y1="35" x2="388" y2="28" />
      <line x1="445" y1="85" x2="452" y2="92" />
      <line x1="445" y1="35" x2="452" y2="28" />
      <line x1="395" y1="85" x2="388" y2="92" />
    </g>

    {/* Birds */}
    <g stroke="#010101" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M340 70 Q345 65 350 70" />
      <path d="M350 70 Q355 65 360 70" />
      <path d="M360 80 Q365 75 370 80" />
      <path d="M370 80 Q375 75 380 80" />
    </g>

    {/* Path to Hostel */}
    <path
      d="M250 320 Q200 340 180 360 Q160 380 200 400 L300 400 Q340 380 320 360 Q300 340 250 320"
      fill="#B9FF66"
      fillOpacity="0.3"
      stroke="#010101"
      strokeWidth="1.5"
      strokeDasharray="5,5"
    />

    {/* Small Flowers */}
    <g fill="#B9FF66" stroke="#010101" strokeWidth="1">
      <circle cx="160" cy="310" r="5" />
      <circle cx="160" cy="310" r="2" fill="#010101" />
      <circle cx="340" cy="305" r="4" />
      <circle cx="340" cy="305" r="1.5" fill="#010101" />
      <circle cx="380" cy="320" r="4" />
      <circle cx="380" cy="320" r="1.5" fill="#010101" />
    </g>
  </svg>
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Hostel Ghar - Find Your Perfect Hostel in Nepal</title>
        <meta
          name="description"
          content="Discover and book the best hostels across Nepal. Find affordable, comfortable, and safe accommodations for your journey."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc] pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-7 animate-slide-up order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/20 text-brand-black text-sm font-semibold tracking-tight">
                  <span className="text-lg">🏔️</span> #1 Hostel Booking Platform in Nepal
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-black leading-[1.1] tracking-tight">
                  Find Your Perfect{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">Hostel</span>
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-brand-lime/50 -z-0 rounded-sm"></span>
                  </span>{' '}
                  Away From Home
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 max-w-lg leading-relaxed">
                  Discover affordable, comfortable, and safe hostels across Nepal. Whether
                  you&apos;re a backpacker, student, or digital nomad, we&apos;ve got the perfect
                  place for you.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button className="flex items-center gap-2 px-7 py-3.5 bg-brand-black text-white font-semibold rounded-xl hover:bg-brand-black/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand-black/20">
                    Explore Hostels
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="flex items-center gap-2 px-7 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300 hover:-translate-y-0.5 shadow-lime">
                    List Your Hostel
                  </button>
                </div>

                <div className="flex items-center gap-6 sm:gap-8 pt-4">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-extrabold text-brand-black">500+</p>
                    <p className="text-sm text-neutral-500 font-medium">Hostels Listed</p>
                  </div>
                  <div className="h-10 w-px bg-neutral-200"></div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-extrabold text-brand-black">10K+</p>
                    <p className="text-sm text-neutral-500 font-medium">Happy Travelers</p>
                  </div>
                  <div className="h-10 w-px bg-neutral-200"></div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-extrabold text-brand-black">50+</p>
                    <p className="text-sm text-neutral-500 font-medium">Cities Covered</p>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative animate-fade-in order-1 lg:order-2">
                <div className="relative z-10">
                  <HostelIllustration />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-brand-lime/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-brand-lime/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -right-4 w-4 h-4 bg-brand-lime rounded-full animate-bounce-soft"></div>
                <div
                  className="absolute top-1/4 -left-2 w-3 h-3 bg-brand-lime/60 rounded-full animate-bounce-soft"
                  style={{ animationDelay: '0.5s' }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <CaseStudies />
        <WorkingProcess />
        <Team />
        <Testimonials />
        <Contact />

        <Footer />
      </main>
    </>
  );
}
