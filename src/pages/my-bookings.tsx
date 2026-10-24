import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { useMyBookings, useBookingMutations } from '@/hooks/useBookings';
import { BookingStatus, BookingItem } from '@/lib/api/bookings';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Building,
} from 'lucide-react';

export default function MyBookingsPage() {
  const [page, setPage] = useState<number>(1);
  const { bookings, pagination, loading, error, refetch } = useMyBookings({ page, limit: 10 });
  const { cancel, submitting } = useBookingMutations();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleCancelBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking request?')) {
      return;
    }

    try {
      setCancellingId(id);
      setActionError(null);
      await cancel(id);
      await refetch({ page, limit: 10 });
    } catch (err: any) {
      setActionError(err.message || 'Failed to cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle size={13} /> Confirmed
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
            <XCircle size={13} /> Cancelled
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle size={13} /> Rejected
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={13} /> Pending Review
          </span>
        );
    }
  };

  return (
    <>
      <Seo
        title="My Bookings — Hostel Ghar"
        description="View and manage your hostel accommodation requests on Hostel Ghar."
        path="/my-bookings"
      />
      <main className="min-h-screen bg-neutral-50 flex flex-col justify-between">
        <div>
          <Header />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: 'My Bookings', path: '/my-bookings' },
              ]}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-brand-black tracking-tight">
                  My Bookings
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Track the status of your room reservation applications.
                </p>
              </div>
              <Link
                href="/hostels"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-lime text-brand-black font-bold text-sm hover:bg-brand-lime/85 transition-colors self-start sm:self-auto"
              >
                Find Hostels
              </Link>
            </div>

            {actionError && (
              <div className="flex items-center gap-2 p-4 mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-neutral-200">
                <Loader2 size={36} className="animate-spin text-brand-lime mb-3" />
                <p className="text-sm font-semibold text-neutral-500">Loading your bookings...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-neutral-200">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">Could not load bookings</h3>
                <p className="text-sm text-neutral-500 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={() => refetch({ page, limit: 10 })}
                  className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  <Building size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">No bookings yet</h3>
                <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
                  You haven&apos;t booked any hostels yet. Explore verified hostels across
                  Kathmandu, Lalitpur, and Pokhara.
                </p>
                <Link
                  href="/hostels"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-lime text-brand-black font-bold text-sm hover:bg-brand-lime/85 transition-colors"
                >
                  Explore Hostels
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking: BookingItem) => (
                  <div
                    key={booking.id}
                    className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-brand-black">
                          {booking.hostel?.name || 'Hostel Booking'}
                        </h2>
                        {getStatusBadge(booking.status)}
                      </div>

                      {booking.hostel?.address && (
                        <p className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                          <MapPin size={13} /> {booking.hostel.address}
                          {booking.hostel.city ? `, ${booking.hostel.city}` : ''}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <Calendar size={14} className="text-neutral-400" />
                          Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                        </span>
                        <span className="text-neutral-400">·</span>
                        <span>Requested on {new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>

                      {booking.remarks && (
                        <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 italic mt-2">
                          &ldquo;{booking.remarks}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 md:self-center shrink-0">
                      {booking.hostelId && (
                        <Link
                          href={`/hostel/${booking.hostelId}`}
                          className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          View Hostel
                        </Link>
                      )}

                      {booking.status === 'PENDING' && (
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={submitting && cancellingId === booking.id}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {submitting && cancellingId === booking.id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      Showing page {pagination.currentPage} of {pagination.totalPages} (
                      {pagination.totalItems} total bookings)
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const prev = Math.max(1, page - 1);
                          setPage(prev);
                          refetch({ page: prev, limit: 10 });
                        }}
                        disabled={!pagination.hasPrevPage || loading}
                        className="px-3.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const next = page + 1;
                          setPage(next);
                          refetch({ page: next, limit: 10 });
                        }}
                        disabled={!pagination.hasNextPage || loading}
                        className="px-3.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
