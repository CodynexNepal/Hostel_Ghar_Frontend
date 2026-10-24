import { useState, useEffect, useCallback } from 'react';
import {
  getMyBookings,
  getHostelBookings,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  BookingItem,
  BookingPagination,
  BookingListParams,
  BookingStatus,
  CreateBookingRequest,
  CreateBookingResponse,
  BookingActionResponse,
} from '@/lib/api/bookings';

export function useMyBookings(initialParams: BookingListParams = { page: 1, limit: 10 }) {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [pagination, setPagination] = useState<BookingPagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialPage = initialParams?.page ?? 1;
  const initialLimit = initialParams?.limit ?? 10;

  const fetchBookings = useCallback(
    async (params?: BookingListParams) => {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyBookings({
          page: params?.page ?? initialPage,
          limit: params?.limit ?? initialLimit,
        });
        setBookings(res.data || []);
        setPagination(res.pagination || null);
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Failed to fetch bookings';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [initialPage, initialLimit]
  );

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, pagination, loading, error, refetch: fetchBookings };
}

export function useHostelBookings(
  hostelId?: string,
  initialParams: BookingListParams = { page: 1, limit: 10 }
) {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [pagination, setPagination] = useState<BookingPagination | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(hostelId));
  const [error, setError] = useState<string | null>(null);

  const initialPage = initialParams?.page ?? 1;
  const initialLimit = initialParams?.limit ?? 10;

  const fetchHostelBookings = useCallback(
    async (params?: BookingListParams) => {
      if (!hostelId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await getHostelBookings(hostelId, {
          page: params?.page ?? initialPage,
          limit: params?.limit ?? initialLimit,
        });
        setBookings(res.data || []);
        setPagination(res.pagination || null);
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Failed to fetch hostel bookings';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [hostelId, initialPage, initialLimit]
  );

  useEffect(() => {
    if (hostelId) {
      fetchHostelBookings();
    }
  }, [hostelId, fetchHostelBookings]);

  return { bookings, pagination, loading, error, refetch: fetchHostelBookings };
}

export function useBookingMutations() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const requestBooking = async (
    payload: CreateBookingRequest,
    idempotencyKey?: string
  ): Promise<CreateBookingResponse> => {
    try {
      setSubmitting(true);
      setError(null);
      return await createBooking(payload, idempotencyKey);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit booking';
      setError(msg);
      throw new Error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const changeStatus = async (
    id: string,
    status: BookingStatus
  ): Promise<BookingActionResponse> => {
    try {
      setSubmitting(true);
      setError(null);
      return await updateBookingStatus(id, status);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update booking status';
      setError(msg);
      throw new Error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const cancel = async (id: string): Promise<BookingActionResponse> => {
    try {
      setSubmitting(true);
      setError(null);
      return await cancelBooking(id);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to cancel booking';
      setError(msg);
      throw new Error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return { requestBooking, changeStatus, cancel, submitting, error };
}
