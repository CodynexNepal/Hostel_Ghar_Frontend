import type { GetStaticProps } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getPageMeta } from '@/lib/seo/metadata';

export default function PrivacyPage() {
  const meta = getPageMeta('/privacy-policy');
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/privacy-policy"
        keywords={meta.keywords}
      />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Privacy & Terms', path: '/privacy-policy' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mb-4">
            Privacy Policy and Terms of Service
          </h1>
          <p className="text-sm text-neutral-400 mb-8">
            Last updated: 1 September 2026 · Hostel Ghar Pvt. Ltd., Thamel, Kathmandu
          </p>
          <section className="space-y-8 text-[17px] text-neutral-600 leading-relaxed">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">
                What data do we collect?
              </h2>
              <p>
                Account details you provide (name, email, phone), booking history, and basic usage
                analytics. We never sell personal data. Payment details are processed by our gateway
                partners — we store only last-4 digits and receipts.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">You own your data</h2>
              <p>
                Export everything anytime from your dashboard. Delete your account in one click —
                bookings anonymise, personal data purges within 30 days. No lock-in, no dark
                patterns.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">
                Booking and cancellation terms
              </h2>
              <p>
                Most bookings cancel free 24–48 hours before check-in. Monthly stays need 7 days
                notice. Advance-payment refunds land in 3–5 working days. Festival periods may carry
                stricter house rules shown per listing.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">Owner terms</h2>
              <p>
                Listing is free forever; Hostel Ghar takes 5% only on completed paid bookings.
                Owners warrant truthful photos, prices and availability; repeated misrepresentation
                loses the Verified badge.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">Contact</h2>
              <p>
                Questions:{' '}
                <a className="underline font-semibold" href="mailto:info@hostelghar.com">
                  info@hostelghar.com
                </a>{' '}
                · +977-1-1234567 · Thamel, Kathmandu, Nepal.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
