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
  HostelMeal,
  WeeklyMealResponse,
  HostelLocationData,
  HostelLocationResponse,
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
  const { page = 1, limit = 20, enabled = true } = options;

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
      if (process.env.NODE_ENV === 'development') {
        console.error('[Hostels API Error]:', err);
      }
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('No hostels found matching your request.');
        } else if (status === 429) {
          setError('Too many requests. Please wait a moment and try again.');
        } else if (status && status >= 500) {
          setError('Our service is temporarily unavailable. Please try again in a few moments.');
        } else if (err.code === 'ECONNABORTED' || err.message?.toLowerCase().includes('timeout')) {
          setError(
            'The request took too long. Please check your internet connection and try again.'
          );
        } else {
          setError(
            'Unable to load hostels right now. Please check your internet connection and try again.'
          );
        }
      } else {
        setError('Something went wrong while loading hostels. Please try again later.');
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
  meals: HostelMeal[];
  hasMeals: boolean;
  location: HostelLocationData | null;
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
  const [meals, setMeals] = useState<HostelMeal[]>([]);
  const [hasMeals, setHasMeals] = useState<boolean>(false);
  const [location, setLocation] = useState<HostelLocationData | null>(null);
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

      // Fetch weekly meals with Axios
      try {
        const mealRes = await apiClient.get<WeeklyMealResponse>(`/hostels/${hostelId}/meals`);
        if (mealRes.data && mealRes.data.success && mealRes.data.data) {
          setMeals(mealRes.data.data.schedule || []);
          setHasMeals(Boolean(mealRes.data.data.hasSchedule));
        }
      } catch {
        // Meals fallback handled gracefully
      }

      // Fetch location with Axios
      try {
        const locRes = await apiClient.get<HostelLocationResponse>(`/hostels/${hostelId}/location`);
        if (locRes.data && locRes.data.success && locRes.data.data) {
          setLocation(locRes.data.data);
        }
      } catch {
        // Location fallback handled gracefully
      }
    } catch (err: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Hostel Detail API Error]:', err);
      }
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('Hostel not found.');
        } else if (status && status >= 500) {
          setError('Hostel details are temporarily unavailable. Please try again shortly.');
        } else {
          setError('Unable to load hostel details at this moment. Please check your connection.');
        }
      } else {
        setError('Unable to load hostel details. Please try again.');
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
    meals,
    hasMeals,
    location,
    loading,
    error,
    refetch: fetchHostel,
  };
}
