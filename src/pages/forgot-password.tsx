'use client';

import { useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowRight, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { forgotPassword } from '@/lib/api/auth';
import * as yup from 'yup';

const forgotPasswordSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
});

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

const inputBase =
  'w-full rounded-xl border bg-neutral-50/50 py-3 pl-11 pr-4 text-sm text-brand-black outline-none transition-all duration-200 placeholder:text-neutral-400 sm:text-[15px]';
const inputOk =
  'border-neutral-200 hover:border-neutral-300 focus:border-brand-lime focus:bg-white focus:ring-4 focus:ring-brand-lime/20';
const inputErr =
  'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const errRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setForgotError('');
    try {
      await forgotPassword({ email: data.email });
      setIsSent(true);
    } catch (err: any) {
      setForgotError(err.message || 'Something went wrong. Please try again.');
      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <>
        <Head>
          <title>Forgot Password | Hostel Ghar</title>
          <meta name="description" content="Reset your Hostel Ghar account password." />
        </Head>

        <Header />

        <AuthLayout
          badge="Reset your password"
          title="Check your inbox"
          subtitle="We’ve sent a password-reset link to your email address."
          benefits={['Link expires in 60 minutes', 'Create a new strong password', 'Secure & encrypted']}
          trust="If you don’t see the email, check your spam folder."
          mobileBrand="Hostel Ghar"
        >
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle size={32} strokeWidth={2.5} className="text-emerald-600" />
            </div>
            <h1 className="mt-6 text-[26px] font-extrabold tracking-tight text-brand-black sm:text-3xl">
              Reset link sent
            </h1>
            <p className="mt-2 max-w-sm mx-auto text-sm text-neutral-500 sm:text-[15px]">
              Follow the link in your email to create a new password.
            </p>

            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-black py-3.5 text-[15px] font-bold text-white shadow-hard transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0"
              >
                Back to sign in <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </AuthLayout>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Forgot Password | Hostel Ghar</title>
        <meta name="description" content="Reset your Hostel Ghar account password." />
      </Head>

      <Header />

      <AuthLayout
        badge="Reset your password"
        title="Forgot password?"
        subtitle="Enter your email and we’ll send you a link to reset your password."
        benefits={['Secure reset link', 'Link expires in 60 minutes', '256-bit encryption']}
        trust="No account? Create one instead."
        mobileBrand="Hostel Ghar"
      >
        <div className="mb-7">
          <h1 className="flex items-center gap-2.5 text-[26px] font-extrabold tracking-tight text-brand-black sm:text-3xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-black text-brand-lime">
              <Mail size={20} strokeWidth={2.5} />
            </span>
            Forgot password
          </h1>
          <p className="mt-2 text-sm text-neutral-500 sm:text-[15px]">
            Enter the email address associated with your account.
          </p>
        </div>

        {forgotError && (
          <div ref={errRef} tabIndex={-1} role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 outline-none">
            <AlertCircle size={19} strokeWidth={2} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm font-medium text-red-700">{forgotError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="forgot-email" className="mb-2 block text-sm font-bold text-brand-black">
              Email address <span className="text-red-500" aria-hidden>*</span>
            </label>
            <div className="relative">
              <Mail size={18} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                id="forgot-email"
                type="email"
                autoComplete="email"
                placeholder="you@gmail.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'forgot-email-error' : undefined}
                className={`${inputBase} pr-12 ${errors.email ? inputErr : inputOk}`}
              />
            </div>
            {errors.email && (
              <p id="forgot-email-error" role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500">
                <AlertCircle size={14} strokeWidth={2} /> {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black py-3.5 text-[15px] font-bold text-white shadow-hard transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 size={17} strokeWidth={2.5} className="animate-spin" /> Sending reset link…
              </>
            ) : (
              <>
                Send reset link <ArrowRight size={17} strokeWidth={2.5} />
              </>
            )}
          </button>

          <p className="pt-1 text-center text-sm text-neutral-500">
            Remember your password?{' '}
            <Link href="/login" className="font-bold text-brand-black underline decoration-brand-lime decoration-2 underline-offset-4 hover:decoration-4">
              Sign in
            </Link>
          </p>
        </form>
      </AuthLayout>

      <Footer />
    </>
  );
};

export default ForgotPassword;