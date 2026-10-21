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

export interface HostelFacilityItem {
  id: string;
  facilityId: string;
  facility?: {
    id: string;
    name: string;
    icon?: string;
    description?: string;
  };
}

export interface HostelOwner {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface HostelDetail extends Hostel {
  phone?: string | null;
  email?: string | null;
  isActive?: boolean;
  updatedAt?: string;
  owner?: HostelOwner;
  hostelFacilities?: HostelFacilityItem[];
}

export interface SingleHostelResponse {
  success: boolean;
  data: HostelDetail;
  isCached?: boolean;
  cacheLevel?: string;
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

/**
 * Gets a single hostel by its UUID.
 * GET /api/v1/hostel-ghar/hostels/:id
 */
export const getHostelById = async (
  id: string
): Promise<SingleHostelResponse> => {
  const response = await apiClient.get<SingleHostelResponse>(`/hostels/${id}`);
  return response.data;
};
