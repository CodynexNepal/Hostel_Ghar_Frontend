import apiClient from './client';

export interface Hostel {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  logoUrl: string | null;
  createdAt: string;
}

export interface ListHostelsResponse {
  success: boolean;
  data: Hostel[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  isCached: boolean;
  cacheLevel: string;
}

export interface ListHostelsParams {
  page?: number;
  limit?: number;
}

/**
 * Lists hostels with pagination from the production API.
 * GET /api/v1/hostel-ghar/hostels
 */
export const listHostels = async (
  params: ListHostelsParams = {}
): Promise<ListHostelsResponse> => {
  const { page = 1, limit = 12 } = params;
  const response = await apiClient.get<ListHostelsResponse>('/hostels', {
    params: { page, limit },
  });
  return response.data;
};