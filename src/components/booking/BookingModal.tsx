import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Calendar,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  BedDouble,
  Tag,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { createBooking, generateIdempotencyKey } from '@/lib/api/bookings';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostelId: string;
  hostelName: string;
  monthlyPrice?: number;
  priceFrom?: number;
  availableBeds?: number;
  totalBeds?: number;
  location?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  hostelId,
  hostelName,
  monthlyPrice = 12000,
  priceFrom = 1200,
  availableBeds = 8,
  totalBeds = 48,
  location = 'Banasthali-16, Kathmandu',
}: BookingModalProps) {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [roomPreference, setRoomPreference] = useState<string>('Double Sharing (2 Beds)');
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
      setRoomPreference('Double Sharing (2 Beds)');
      setIdempotencyKey(generateIdempotencyKey());

      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('token') ||
            localStorage.getItem('access_token') ||
            localStorage.getItem('accessToken')
          : null;
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

      const combinedRemarks = [
        `Preference: ${roomPreference}`,
        remarks.trim() ? `Remarks: ${remarks.trim()}` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      await createBooking(
        {
          hostelId,
          checkInDate,
          remarks: combinedRemarks,
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
      <div className="relative w-full max-w-lg p-6 bg-white rounded-3xl shadow-2xl border border-neutral-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors z-10"
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Sign In to Book</h3>
            <p className="text-sm text-neutral-600 mb-4 max-w-sm mx-auto">
              Please sign in to complete your booking request for{' '}
              <span className="font-semibold text-neutral-900">{hostelName}</span>. Your booking is
              guaranteed with instant status tracking.
            </p>
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 mb-6 text-xs text-neutral-600 flex items-center justify-center gap-4">
              <span>
                💰 Monthly: <strong>NPR {monthlyPrice.toLocaleString()}</strong>
              </span>
              <span>
                🛏️ Available: <strong>{availableBeds} beds</strong>
              </span>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <Link
                href={`/login?redirect=/hostel/${hostelId}`}
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 transition-colors text-sm inline-flex items-center gap-1.5"
              >
                Sign In to Proceed <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-900 mb-2">
              Booking Request Submitted!
            </h3>
            <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
              Your booking request for{' '}
              <span className="font-bold text-neutral-900">{hostelName}</span> with check-in on{' '}
              <span className="font-bold text-neutral-900">{checkInDate}</span> has been sent to the
              hostel administration.
            </p>
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 mb-6 text-xs text-neutral-700 text-left space-y-1.5">
              <p>
                ✓ <strong>Status:</strong> PENDING review by hostel owner
              </p>
              <p>
                ✓ <strong>Room Type:</strong> {roomPreference}
              </p>
              <p>
                ✓ <strong>Estimated Fee:</strong> NPR {monthlyPrice.toLocaleString()}/month
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Link
                href="/my-bookings"
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold hover:bg-brand-lime/85 transition-colors text-sm"
              >
                View My Bookings
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-lime/30 text-brand-black text-xs font-bold mb-2">
                Instant Booking Request
              </span>
              <h2 className="text-2xl font-extrabold text-brand-black tracking-tight">
                Book {hostelName}
              </h2>
              {location && (
                <p className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                  <MapPin size={13} /> {location}
                </p>
              )}
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-lime/20 flex items-center justify-center text-brand-black">
                  <Tag size={17} />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 font-medium">Monthly Rent</p>
                  <p className="text-sm font-bold text-neutral-900">
                    NPR {monthlyPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <BedDouble size={17} />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-500 font-medium">Availability</p>
                  <p className="text-sm font-bold text-emerald-700">
                    {availableBeds} / {totalBeds} Beds Free
                  </p>
                </div>
              </div>
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
                  <BedDouble size={14} /> Preferred Room Sharing
                </label>
                <select
                  value={roomPreference}
                  onChange={(e) => setRoomPreference(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-lime text-neutral-800 text-sm font-medium bg-white"
                >
                  <option value="Single Room">Single Room (Private)</option>
                  <option value="Double Sharing (2 Beds)">Double Sharing (2 Beds)</option>
                  <option value="Triple Sharing (3 Beds)">Triple Sharing (3 Beds)</option>
                  <option value="4-Bed Dormitory">4-Bed Dormitory</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  <MessageSquare size={14} /> Remarks / Special Needs (Optional)
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Need ground floor, vegetarian food, study desk..."
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
                    'Confirm Booking Request'
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
