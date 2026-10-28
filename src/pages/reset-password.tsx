'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  KeyRound,
  ShieldCheck,
  Check,
} from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validation';
import { resetPassword } from '@/lib/api/auth';

const inputBase =
  'w-full rounded-xl border bg-neutral-50/50 py-3 pl-11 pr-11 text-sm text-brand-black outline-none transition-all duration-200 placeholder:text-neutral-400 sm:text-[15px]';
const inputOk =
  'border-neutral-200 hover:border-neutral-300 focus:border-brand-lime focus:bg-white focus:ring-4 focus:ring-brand-lime/20';
const inputErr = 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Read the token from router query or fallback to window.location.search
  useEffect(() => {
    if (router.isReady) {
      const qToken = (router.query.token as string) || '';
      if (qToken) {
        setToken(qToken.trim());
      } else if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const searchToken = urlParams.get('token') || '';
        setToken(searchToken.trim());
      }
      setIsTokenLoaded(true);
    }
  }, [router.isReady, router.query]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  // Password requirement checklists
  const rules = useMemo(() => {
    return {
      minLength: passwordValue.length >= 8,
      hasUpper: /[A-Z]/.test(passwordValue),
      hasLower: /[a-z]/.test(passwordValue),
      hasNumber: /[0-9]/.test(passwordValue),
    };
  }, [passwordValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setApiError('Reset token is missing. Please use the reset link sent to your email.');
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      await resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (err: any) {
      const msg =
        err.message ||
        'This password reset link is invalid or has expired. Please request a new one.';
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <>
        <Head>
          <title>Password Reset Successful | Hostel Ghar</title>
          <meta name="description" content="Your password has been successfully updated." />
        </Head>

        <Header />

        <AuthLayout>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-6 shadow-sm border border-emerald-200/60">
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
              Password Reset Complete!
            </h1>
            <p className="mt-3 max-w-sm mx-auto text-sm text-neutral-600 leading-relaxed">
              Your password has been updated securely. You can now log in to your account with your
              new password.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-lime py-3.5 text-[15px] font-bold text-brand-black shadow-lime transition-all duration-200 hover:-translate-y-px hover:bg-brand-lime/85 active:translate-y-0"
              >
                Sign In to Hostel Ghar <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </AuthLayout>

        <Footer />
      </>
    );
  }

  // MISSING TOKEN SCREEN (When user visits /reset-password without a token)
  if (isTokenLoaded && !token) {
    return (
      <>
        <Head>
          <title>Invalid Reset Link | Hostel Ghar</title>
          <meta name="description" content="Password reset link is invalid or has expired." />
        </Head>

        <Header />

        <AuthLayout>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-6 border border-amber-200/80">
              <KeyRound size={32} strokeWidth={2.2} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
              Missing Reset Token
            </h1>
            <p className="mt-3 max-w-sm mx-auto text-sm text-neutral-600 leading-relaxed">
              This password reset link is invalid or has already expired. Password reset links are
              single-use and time-limited for your security.
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href="/forgot-password"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-black py-3.5 text-[15px] font-bold text-white shadow-hard transition-all duration-200 hover:-translate-y-px hover:bg-neutral-800 active:translate-y-0"
              >
                Request a New Reset Link <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-100 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </AuthLayout>

        <Footer />
      </>
    );
  }

  // MAIN FORM SCREEN
  return (
    <>
      <Head>
        <title>Reset Password | Hostel Ghar</title>
        <meta
          name="description"
          content="Create a new secure password for your Hostel Ghar account."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <AuthLayout>
        {/* Brand Header */}
        <div className="mb-7 text-center">
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

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/25 text-brand-black text-xs font-bold border border-brand-lime/40 mb-2">
            <ShieldCheck size={13} className="text-brand-black" />
            Account Security
          </span>

          <h1 className="text-2xl font-bold tracking-tight text-brand-black sm:text-3xl">
            Create New Password
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Please enter and confirm your new password below.
          </p>
        </div>

        {/* Global Error Banner */}
        {apiError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <div className="space-y-1">
              <p className="font-semibold text-red-800">Could not reset password</p>
              <p className="text-xs text-red-700">{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* New Password Input */}
          <div>
            <label
              htmlFor="new-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
            >
              New Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                autoComplete="new-password"
                {...register('password')}
                className={`${inputBase} ${errors.password ? inputErr : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-black focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password.message}</p>
            )}

            {/* Live Password Strength Indicator */}
            {passwordValue && (
              <div className="mt-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                <p className="font-bold text-neutral-700 mb-1">Password requirements:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <div
                    className={`flex items-center gap-1 ${
                      rules.minLength ? 'text-emerald-700 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Check size={12} strokeWidth={rules.minLength ? 3 : 2} />
                    <span>8+ characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      rules.hasUpper ? 'text-emerald-700 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Check size={12} strokeWidth={rules.hasUpper ? 3 : 2} />
                    <span>1 uppercase letter</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      rules.hasLower ? 'text-emerald-700 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Check size={12} strokeWidth={rules.hasLower ? 3 : 2} />
                    <span>1 lowercase letter</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${
                      rules.hasNumber ? 'text-emerald-700 font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    <Check size={12} strokeWidth={rules.hasNumber ? 3 : 2} />
                    <span>1 number (0-9)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                autoComplete="new-password"
                {...register('confirmPassword')}
                className={`${inputBase} ${errors.confirmPassword ? inputErr : inputOk}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-black focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-lime py-3.5 text-center text-[15px] font-bold text-brand-black shadow-lime transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-lime/85 hover:shadow-lime-lg active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} strokeWidth={2.5} className="animate-spin text-brand-black" />
                <span>Updating password…</span>
              </>
            ) : (
              <>
                <span>Set New Password</span>
                <ArrowRight size={17} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-neutral-500">
          Remember your password?{' '}
          <Link
            href="/login"
            className="font-bold text-brand-black hover:text-neutral-700 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </AuthLayout>

      <Footer />
    </>
  );
}
