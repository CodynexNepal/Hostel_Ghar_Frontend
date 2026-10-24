import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Calendar, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createBooking, generateIdempotencyKey } from '@/lib/api/bookings';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostelId: string;
  hostelName: string;
}

export default function BookingModal({ isOpen, onClose, hostelId, hostelName }: BookingModalProps) {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [idempotencyKey, setIdempotencyKey] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsSuccess(false);
      setCheckInDate('');
      setRemarks('');
      setIdempotencyKey(generateIdempotencyKey());

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      setIsAuthenticated(Boolean(token));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Tomorrow's date formatted as YYYY-MM-DD for min date
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInDate) {
      setError('Please select a valid check-in date.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await createBooking(
        {
          hostelId,
          checkInDate,
          remarks: remarks.trim() || undefined,
        },
        idempotencyKey
      );
      setIsSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit booking request.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg p-6 bg-white rounded-3xl shadow-2xl border border-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Login Required</h3>
            <p className="text-sm text-neutral-600 mb-6 max-w-sm mx-auto">
              You must be logged in as a registered user to send a booking request to{' '}
              <span className="font-semibold text-neutral-900">{hostelName}</span>.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 transition-colors text-sm"
              >
                Go to Login
              </Link>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle size={30} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Booking Requested!</h3>
            <p className="text-sm text-neutral-600 mb-6">
              Your request for <span className="font-semibold">{hostelName}</span> on{' '}
              <span className="font-semibold">{checkInDate}</span> has been submitted to the warden.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 transition-colors text-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-lime/30 text-brand-black text-xs font-bold mb-2">
                Booking Request
              </span>
              <h2 className="text-2xl font-extrabold text-brand-black tracking-tight">
                Book {hostelName}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Choose your intended check-in date. The hostel warden will review your request.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  <Calendar size={14} /> Expected Check-in Date *
                </label>
                <input
                  type="date"
                  min={today}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-lime text-neutral-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  <MessageSquare size={14} /> Remarks / Special Needs (Optional)
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Need single room, ground floor preferred, vegetarian food..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-lime text-neutral-800 text-sm placeholder:text-neutral-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 font-semibold hover:bg-neutral-50 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 text-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
