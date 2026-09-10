'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Send, MessageSquare, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { HostelImage } from '@/components/ui/Media';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
});

type FormData = yup.InferType<typeof schema>;

const InputError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-500">{message}</p>;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    reset();
  };

  return (
    <Section tone="gray" spacing="md">
        <SectionHeader
          eyebrow="Contact Us"
          title="Get In Touch"
          description="Connect with us: Let's discuss how we can help your hostel grow"
        />

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl border border-neutral-100">
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} strokeWidth={2} className="text-brand-black" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">Message Sent!</h3>
                <p className="text-neutral-600">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      errors.name
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20'
                    }`}
                  />
                  <InputError message={errors.name?.message} />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20'
                    }`}
                  />
                  <InputError message={errors.email?.message} />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-brand-black mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us about your hostel..."
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                      errors.message
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20'
                    }`}
                  />
                  <InputError message={errors.message?.message} />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 shadow-lime hover:shadow-lime-lg transition-all duration-300"
                >
                  <Send size={18} strokeWidth={2.2} />
                  Send Message
                </button>
              </form>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-lime/20 rounded-xl flex items-center justify-center">
                  <MessageSquare size={22} strokeWidth={2} className="text-brand-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-black mb-1">Say Hi</h3>
                  <p className="text-neutral-600">
                    We&apos;d love to hear from you. Send us a message and we&apos;ll respond as
                    soon as possible.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-lime/20 rounded-xl flex items-center justify-center">
                  <Mail size={22} strokeWidth={2} className="text-brand-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-black mb-1">Email Us</h3>
                  <p className="text-neutral-600">hello@hostelghar.com</p>
                  <p className="text-neutral-600">support@hostelghar.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-lime/20 rounded-xl flex items-center justify-center">
                  <MapPin size={22} strokeWidth={2} className="text-brand-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-black mb-1">Visit Us</h3>
                  <p className="text-neutral-600">Thamel, Kathmandu</p>
                  <p className="text-neutral-600">Nepal</p>
                </div>
              </div>
              <HostelImage
                src="/images/static/hostel.jpg"
                alt="Hostel Ghar office area in Thamel, Kathmandu"
                aspect="video"
                rounded="xl"
                objectPosition="center 60%"
                className="mt-5"
                sizes="(max-width: 1024px) 100vw, 50vw"
              >
                <div className="flex h-full items-end bg-gradient-to-t from-brand-black/70 via-brand-black/10 to-transparent p-4">
                  <span className="px-3 py-1.5 rounded-full bg-brand-lime text-brand-black text-xs font-bold">
                    Thamel, Kathmandu
                  </span>
                </div>
              </HostelImage>
            </div>
            <div className="bg-brand-black p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Get a Free Quote</h3>
              <p className="text-neutral-300 mb-4">
                Ready to grow your hostel business? Let&apos;s discuss your goals.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 transition-all duration-300"
              >
                Get your free proposal
              </a>
            </div>
          </div>
        </div>
    </Section>
  );
};

export default Contact;
