import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import apiClient from '@/lib/api/client';
import {
  Hostel,
  HostelDetail,
  ListHostelsParams,
  ListHostelsResponse,
  SingleHostelResponse,
  HostelFacility,
} from '@/lib/api/hostels';

export interface UseHostelsOptions extends ListHostelsParams {
  enabled?: boolean;
}

export interface UseHostelsReturn {
  hostels: Hostel[];
  pagination: ListHostelsResponse['pagination'] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom React hook to list hostels from the actual API endpoint using Axios.
 * Endpoint: GET /api/v1/hostel-ghar/hostels
 */
export function useHostels(options: UseHostelsOptions = {}): UseHostelsReturn {
  const { page = 1, limit = 12, enabled = true } = options;

  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [pagination, setPagination] = useState<ListHostelsResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchHostels = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      // Calling the actual endpoint with Axios
      const response = await apiClient.get<ListHostelsResponse>('/hostels', {
        params: { page, limit },
      });

      if (response.data && response.data.success) {
        setHostels(response.data.data || []);
        setPagination(response.data.pagination || null);
      } else {
        setHostels([]);
        setPagination(null);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message || 'Failed to fetch hostels';
        setError(message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while fetching hostels');
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit, enabled]);

  useEffect(() => {
    let cancelled = false;

    if (enabled) {
      fetchHostels();
    }

    return () => {
      cancelled = true;
    };
  }, [fetchHostels, enabled]);

  return {
    hostels,
    pagination,
    loading,
    error,
    refetch: fetchHostels,
  };
}

export interface UseHostelReturn {
  hostel: HostelDetail | null;
  facilities: HostelFacility[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom React hook to fetch a single hostel by its UUID/slug with Axios.
 * Endpoint: GET /api/v1/hostel-ghar/hostels/:id
 */
export function useHostel(hostelId?: string): UseHostelReturn {
  const [hostel, setHostel] = useState<HostelDetail | null>(null);
  const [facilities, setFacilities] = useState<HostelFacility[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(hostelId));
  const [error, setError] = useState<string | null>(null);

  const fetchHostel = useCallback(async () => {
    if (!hostelId) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch hostel details with Axios
      const hostelRes = await apiClient.get<SingleHostelResponse>(`/hostels/${hostelId}`);
      if (hostelRes.data && hostelRes.data.success) {
        setHostel(hostelRes.data.data);
      }

      // Fetch hostel facilities with Axios
      try {
        const facRes = await apiClient.get<{ success: boolean; data: HostelFacility[] }>(
          `/hostels/${hostelId}/facilities`
        );
        if (facRes.data && facRes.data.success) {
          setFacilities(facRes.data.data || []);
        }
      } catch {
        // Facilities fallback handled gracefully
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || err.message || 'Failed to fetch hostel details';
        setError(message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while fetching hostel details');
      }
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    if (hostelId) {
      fetchHostel();
    }
  }, [hostelId, fetchHostel]);

  return {
    hostel,
    facilities,
    loading,
    error,
    refetch: fetchHostel,
  };
}
