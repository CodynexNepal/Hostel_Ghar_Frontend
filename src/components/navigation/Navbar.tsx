import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">Hostel Ghar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/hostels"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              Hostels
            </Link>
            <Link
              href="/locations"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              Locations
            </Link>
            <Link
              href="/pricing"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-neutral-600 hover:text-primary-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
              List Your Hostel
            </button>
            <button className="btn-primary text-sm py-2 px-4">Sign In</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <div className="flex flex-col gap-4">
              <Link
                href="/hostels"
                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Hostels
              </Link>
              <Link
                href="/locations"
                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Locations
              </Link>
              <Link
                href="/pricing"
                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2"
              >
                Contact
              </Link>
              <hr className="border-neutral-100" />
              <button className="text-neutral-600 hover:text-primary-600 transition-colors font-medium py-2 text-left">
                List Your Hostel
              </button>
              <button className="btn-primary text-sm py-2 px-4 w-full">Sign In</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
