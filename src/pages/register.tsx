'use client';

import { useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, User, Phone, UserPlus } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { registerSchema, type RegisterFormData } from '@/lib/validation';

const inputBase = 'w-full rounded-xl border bg-neutral-50/50 py-3 pl-11 pr-4 text-sm text-brand-black outline-none transition-all duration-200 placeholder:text-neutral-400 sm:text-[15px]';
const inputOk = 'border-neutral-200 hover:border-neutral-300 focus:border-brand-lime focus:bg-white focus:ring-4 focus:ring-brand-lime/20';
const inputErr = 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();
  const errRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({ resolver: yupResolver(registerSchema) });
  const password = watch('password') || '';

  const getPasswordStrength = (pass: string) => {
    let s = 0;
    if (pass.length >= 8) s++;
    if (pass.length >= 12) s++;
    if (/[A-Z]/.test(pass)) s++;
    if (/[0-9]/.test(pass)) s++;
    if (/[^A-Za-z0-9]/.test(pass)) s++;
    return Math.min(s, 5);
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][passwordStrength] || '';
  const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-emerald-500'][passwordStrength] || '';

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push('/login');
    } catch {
      setRegisterError('Something went wrong. Please try again.');
      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | Hostel Ghar</title>
        <meta name="description" content="Create your Hostel Ghar account." />
      </Head>

      <Header />

      <AuthLayout
        badge="Join 12,000+ guests"
        title="Create your account"
        subtitle="Book verified hostels in minutes — free forever for guests."
        benefits={['Access 500+ verified hostels', 'Manage your bookings easily', 'Exclusive member discounts']}
        trust="Your data is protected with 256-bit encryption"
        mobileBrand="Hostel Ghar"
      >
        <div className="mb-7">
          <h1 className="flex items-center gap-2.5 text-[26px] font-extrabold tracking-tight text-brand-black sm:text-3xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-lime text-brand-black">
              <UserPlus size={20} strokeWidth={2.5} />
            </span>
            Join Hostel Ghar
          </h1>
          <p className="mt-2 text-sm text-neutral-500 sm:text-[15px]">Full name, Gmail, phone and password — that&apos;s all we need.</p>
        </div>

        {registerError && (
          <div ref={errRef} tabIndex={-1} role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 outline-none">
            <AlertCircle size={19} strokeWidth={2} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm font-medium text-red-700">{registerError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="reg-name" className="mb-2 block text-sm font-bold text-brand-black">Full name <span className="text-red-500" aria-hidden>*</span></label>
            <div className="relative">
              <User size={18} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input id="reg-name" type="text" autoComplete="name" placeholder="e.g. Aashish Sharma" {...register('fullName')} aria-invalid={!!errors.fullName} className={`${inputBase} ${errors.fullName ? inputErr : inputOk}`} />
            </div>
            {errors.fullName && (<p role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"><AlertCircle size={14} strokeWidth={2} /> {errors.fullName.message}</p>)}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="reg-email" className="mb-2 block text-sm font-bold text-brand-black">Gmail <span className="text-red-500" aria-hidden>*</span></label>
              <div className="relative">
                <Mail size={18} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input id="reg-email" type="email" autoComplete="email" placeholder="you@gmail.com" {...register('email')} aria-invalid={!!errors.email} className={`${inputBase} ${errors.email ? inputErr : inputOk}`} />
              </div>
              {errors.email && (<p role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"><AlertCircle size={14} strokeWidth={2} /> {errors.email.message}</p>)}
            </div>
            <div>
              <label htmlFor="reg-phone" className="mb-2 block text-sm font-bold text-brand-black">Phone <span className="text-red-500" aria-hidden>*</span></label>
              <div className="relative">
                <Phone size={18} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input id="reg-phone" type="tel" autoComplete="tel" placeholder="+977 98XXXXXXXX" {...register('phone')} aria-invalid={!!errors.phone} className={`${inputBase} ${errors.phone ? inputErr : inputOk}`} />
              </div>
              {errors.phone && (<p role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"><AlertCircle size={14} strokeWidth={2} /> {errors.phone.message}</p>)}
            </div>
          </div>

          <div>
            <label htmlFor="reg-password" className="mb-2 block text-sm font-bold text-brand-black">Password <span className="text-red-500" aria-hidden>*</span></label>
            <div className="relative">
              <Lock size={18} strokeWidth={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input id="reg-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Create a strong password" {...register('password')} aria-invalid={!!errors.password} className={`${inputBase} pr-12 ${errors.password ? inputErr : inputOk}`} />
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-black">
                {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2.5" aria-live="polite">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (<span key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${passwordStrength >= level ? strengthColor : 'bg-neutral-200'}`} />))}
                </div>
                {strengthLabel && (<p className={`mt-1 text-xs font-bold ${passwordStrength <= 2 ? 'text-red-500' : passwordStrength === 3 ? 'text-yellow-600' : 'text-green-600'}`}>{strengthLabel}</p>)}
              </div>
            )}
            {errors.password && (<p role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"><AlertCircle size={14} strokeWidth={2} /> {errors.password.message}</p>)}
            <p className="mt-1.5 text-xs text-neutral-400">Min. 8 characters with uppercase, lowercase & a number.</p>
          </div>

          <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black py-3.5 text-[15px] font-bold text-white shadow-hard transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
            {isLoading ? (<><Loader2 size={17} strokeWidth={2.5} className="animate-spin" /> Creating account…</>) : (<>Create account <ArrowRight size={17} strokeWidth={2.5} /></>)}
          </button>

          <p className="pt-1 text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-brand-black underline decoration-brand-lime decoration-2 underline-offset-4 hover:decoration-4">
              Log in
            </Link>
          </p>
        </form>
      </AuthLayout>

      <Footer />
    </>
  );
};

export default Register;
