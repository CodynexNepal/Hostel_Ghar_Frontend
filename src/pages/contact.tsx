import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import DirectAnswer from '@/components/aeo/DirectAnswer';
import FaqAccordion from '@/components/aeo/FaqAccordion';
import { FAQS } from '@/data/faqs';
import { faqJsonLd } from '@/lib/seo/jsonLd';
import { getPageMeta } from '@/lib/seo/metadata';
import LottieAnimation from '@/components/lottie/LottieAnimation';
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { submitContactMessage } from '@/lib/api/interactions';

export default function ContactPage() {
  const meta = getPageMeta('/contact');
  const faqs = FAQS.filter((f) =>
    ['is-hostel-ghar-free', 'cancellation', 'list-free'].includes(f.id)
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContactMessage(formData);
      setSuccessMessage(
        res.message ||
          "Thank you for reaching out! We've received your message and will reply within 24 hours."
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          'Failed to send message. Please try again or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path="/contact"
        keywords={meta.keywords}
      />
      <JsonLd
        data={faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))}
        id="ld-contact-faq"
      />
      <main className="min-h-screen bg-transparent">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Contact', path: '/contact' },
            ]}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight flex-1 overflow-hidden">
              <span className="inline-block animate-text-reveal">
                Contact Hostel Ghar — we reply within 24 hours
              </span>
            </h1>
            <LottieAnimation variant="location-pin" size="md" className="flex-shrink-0" />
          </div>
          <DirectAnswer
            question="How do I reach Hostel Ghar support?"
            answer="Email info@hostelghar.com or call +977-1-1234567 (Sun–Fri, 9am–6pm NPT). Office: Thamel, Kathmandu. Booking help, listing help and press: same inbox, under-24-hour reply."
          />
          <div className="grid sm:grid-cols-3 gap-4 my-8">
            <a
              href="mailto:info@hostelghar.com"
              className="bg-white border border-neutral-100 rounded-2xl p-5 hover:border-brand-lime transition-colors block"
            >
              <Mail size={22} aria-hidden className="mb-2 text-brand-black" />
              <p className="font-bold text-brand-black m-0">Email</p>
              <p className="text-sm text-neutral-500 m-0">info@hostelghar.com</p>
            </a>
            <a
              href="tel:+97711234567"
              className="bg-white border border-neutral-100 rounded-2xl p-5 hover:border-brand-lime transition-colors block"
            >
              <Phone size={22} aria-hidden className="mb-2 text-brand-black" />
              <p className="font-bold text-brand-black m-0">Phone</p>
              <p className="text-sm text-neutral-500 m-0">+977-1-1234567</p>
            </a>
            <div className="bg-white border border-neutral-100 rounded-2xl p-5">
              <MapPin size={22} aria-hidden className="mb-2 text-brand-black" />
              <p className="font-bold text-brand-black m-0">Office</p>
              <p className="text-sm text-neutral-500 m-0">Thamel, Kathmandu</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <Clock3 size={15} aria-hidden /> Support hours: Sunday–Friday, 9:00–18:00 Nepal Time
            (UTC+5:45)
          </p>

          {/* Interactive Contact Form */}
          <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 mb-12 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-brand-black">Send us a direct message</h2>
              <p className="text-neutral-500 text-sm mt-1">
                Have a question, feedback, or need booking assistance? Drop your message below.
              </p>
            </div>

            {successMessage ? (
              <div className="p-6 bg-lime-50 border border-lime-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={36} className="text-lime-600 mx-auto" />
                <h3 className="text-lg font-bold text-brand-black">Message Sent Successfully!</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">{successMessage}</p>
                <button
                  type="button"
                  onClick={() => setSuccessMessage(null)}
                  className="px-5 py-2 bg-brand-black text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aarav@example.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      Phone Number (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Booking inquiry or hostel listing"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-brand-black text-sm focus:outline-none focus:border-brand-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-lime text-brand-black font-extrabold rounded-xl hover:bg-brand-lime/85 transition-all shadow-sm cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          <h2 className="text-2xl font-extrabold text-brand-black mb-4">
            Quick answers before you write
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
