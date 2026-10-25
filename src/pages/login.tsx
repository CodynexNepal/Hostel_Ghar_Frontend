'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { loginSchema, type LoginFormData } from '@/lib/validation';
import { login } from '@/lib/api/auth';

const inputBase =
  'w-full rounded-xl border bg-neutral-50/50 py-3 pl-11 pr-4 text-sm text-brand-black outline-none transition-all duration-200 placeholder:text-neutral-400 sm:text-[15px]';
const inputOk =
  'border-neutral-200 hover:border-neutral-300 focus:border-brand-lime focus:bg-white focus:ring-4 focus:ring-brand-lime/20';
const inputErr = 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const errRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (localStorage.getItem('rememberEmail')) setRememberMe(true);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');
    try {
      await login({ email: data.email, password: data.password });
      if (rememberMe) localStorage.setItem('rememberEmail', data.email);
      else localStorage.removeItem('rememberEmail');
      router.push('/');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password. Please try again.');
      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Hostel Ghar</title>
        <meta
          name="description"
          content="Sign in to your Hostel Ghar account to find and book the best hostels across Nepal."
        />
      </Head>

      <Header />

      <AuthLayout>
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block group mb-3">
            <div className="relative mx-auto h-14 w-14 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs bg-white p-1 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/logo/hostel_ghar_logo.jpg"
                alt="Hostel Ghar"
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in to continue to your account
          </p>
        </div>

        {loginError && (
          <div
            ref={errRef}
            tabIndex={-1}
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 outline-none"
          >
            <AlertCircle size={19} strokeWidth={2} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm font-medium text-red-700">{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-bold text-brand-black">
              Email{' '}
              <span className="text-red-500" aria-hidden>
                *
              </span>
            </label>
            <div className="relative">
              <Mail
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
              />
            </div>
            {errors.email && (
              <p
                id="login-email-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"
              >
                <AlertCircle size={14} strokeWidth={2} /> {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-bold text-brand-black"
            >
              Password{' '}
              <span className="text-red-500" aria-hidden>
                *
              </span>
            </label>
            <div className="relative">
              <Lock
                size={18}
                strokeWidth={2}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register('password')}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                className={`${inputBase} pr-12 ${errors.password ? inputErr : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-black"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={2} />
                ) : (
                  <Eye size={18} strokeWidth={2} />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="login-password-error"
                role="alert"
                className="mt-1.5 flex items-center gap-1 text-[13px] font-medium text-red-500"
              >
                <AlertCircle size={14} strokeWidth={2} /> {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer select-none items-center gap-2 font-medium text-neutral-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-[#65a30d]"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="rounded font-bold text-brand-black underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black py-3.5 text-[15px] font-bold text-white shadow-hard transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 size={17} strokeWidth={2.5} className="animate-spin" /> Signing you in…
              </>
            ) : (
              <>
                Sign in <ArrowRight size={17} strokeWidth={2.5} />
              </>
            )}
          </button>

          <p className="pt-1 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-brand-black underline decoration-brand-lime decoration-2 underline-offset-4 hover:decoration-4"
            >
              Create account
            </Link>
          </p>
        </form>
      </AuthLayout>

      <Footer />
    </>
  );
};

export default Login;
