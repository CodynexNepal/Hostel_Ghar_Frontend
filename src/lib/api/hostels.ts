import apiClient from './client';

export interface BedInventory {
  total: number;
  available: number;
  occupied: number;
}

export interface HostelAdminCreator {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Hostel {
  id: string;
  name: string;
  type?: string;
  category?: string;
  city: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  logoUrl: string | null;
  isActive?: boolean;
  createdAt?: string;
  owner?: HostelOwner | null;
  monthlyPrice?: number;
  monthlyRent?: number;
  hostelFee?: number;
  currency?: string;
  priceFrom?: number;
  totalBeds?: number;
  availableBeds?: number;
  occupiedBeds?: number;
  activeResidents?: number;
  totalStudents?: number;
  beds?: BedInventory;
  isFeatured?: boolean;
  discountPercent?: number;
  rating?: number;
  reviewCount?: number;
  facilities?: string[] | HostelFacility[];
  detailUrl?: string;
}

export interface HostelFacility {
  id: string;
  title: string;
  slug?: string;
  facilityId?: string;
  description?: string | null;
  tag?: string;
  clientKey?: string | null;
}

export interface HostelFacilityItem {
  id: string;
  facilityId: string;
  facility?: {
    id: string;
    name?: string;
    title?: string;
    icon?: string;
    description?: string;
  };
  description?: string | null;
  tag?: string;
}

export interface HostelOwner {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface HostelDetail extends Omit<Hostel, 'facilities'> {
  phone?: string | null;
  email?: string | null;
  isActive?: boolean;
  updatedAt?: string;
  totalBeds?: number;
  availableBeds?: number;
  occupiedBeds?: number;
  activeResidents?: number;
  totalStudents?: number;
  hostelFee?: number;
  monthlyRent?: number;
  currency?: string;
  beds?: BedInventory;
  owner?: HostelOwner | null;
  createdByAdmin?: HostelAdminCreator | null;
  hostelFacilities?: HostelFacilityItem[];
  facilities?: HostelFacility[];
  latitude?: number | null;
  longitude?: number | null;
  isLocationShared?: boolean;
  locationUpdatedAt?: string | null;
  meals?: HostelMeal[];
}

export type DayOfWeek =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

export interface HostelMeal {
  id?: string | null;
  dayOfWeek: DayOfWeek;
  breakfastDescription?: string | null;
  breakfastTime?: string | null;
  breakfastNotes?: string | null;
  mainMealDescription?: string | null;
  mainMealTime?: string | null;
  mainMealNotes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface WeeklyMealScheduleData {
  hostelId: string;
  hasSchedule: boolean;
  lastUpdatedAt: string | null;
  schedule: HostelMeal[];
}

export interface WeeklyMealResponse {
  success: boolean;
  data: WeeklyMealScheduleData;
}

export interface HostelLocationData {
  hostelId: string;
  latitude: number | null;
  longitude: number | null;
  isLocationShared: boolean;
  locationUpdatedAt: string | null;
  address: string | null;
  city: string | null;
}

export interface HostelLocationResponse {
  success: boolean;
  data: HostelLocationData;
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
export const listHostels = async (params: ListHostelsParams = {}): Promise<ListHostelsResponse> => {
  const { page = 1, limit = 20 } = params;
  const response = await apiClient.get<ListHostelsResponse>('/hostels', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Gets a single hostel by its UUID.
 * GET /api/v1/hostel-ghar/hostels/:id
 */
export const getHostelById = async (id: string): Promise<SingleHostelResponse> => {
  const response = await apiClient.get<SingleHostelResponse>(`/hostels/${id}`);
  return response.data;
};

/**
 * Lists normalized facilities for a hostel.
 * GET /api/v1/hostel-ghar/hostels/:hostelId/facilities
 */
export const getHostelFacilities = async (
  hostelId: string
): Promise<{ success: boolean; data: HostelFacility[] }> => {
  const response = await apiClient.get<{ success: boolean; data: HostelFacility[] }>(
    `/hostels/${hostelId}/facilities`
  );
  return response.data;
};

/**
 * Full sync (replace) — send the whole frontend editor list; DB ends matching it.
 * Requires role: owner or admin. Frontend id maps to clientKey.
 * PUT /api/v1/hostel-ghar/hostels/:hostelId/facilities
 */
export interface SyncFacilityItem {
  id?: string;
  title: string;
  description?: string;
  tag?: string;
}

export const syncHostelFacilities = async (
  hostelId: string,
  facilities: SyncFacilityItem[]
): Promise<{ success: boolean; data: HostelFacility[] }> => {
  const response = await apiClient.put<{ success: boolean; data: HostelFacility[] }>(
    `/hostels/${hostelId}/facilities`,
    { facilities }
  );
  return response.data;
};

/**
 * Add (or update) one facility.
 * POST /api/v1/hostel-ghar/hostels/:hostelId/facilities
 */
export interface AddFacilityPayload {
  id?: string;
  title: string;
  description?: string;
  tag?: string;
}

export const addHostelFacility = async (
  hostelId: string,
  payload: AddFacilityPayload
): Promise<{ success: boolean; data: HostelFacility }> => {
  const response = await apiClient.post<{ success: boolean; data: HostelFacility }>(
    `/hostels/${hostelId}/facilities`,
    payload
  );
  return response.data;
};

/**
 * Removes a facility. :facilityKey accepts junction UUID or frontend clientKey.
 * DELETE /api/v1/hostel-ghar/hostels/:hostelId/facilities/:facilityKey
 */
export const deleteHostelFacility = async (
  hostelId: string,
  facilityKey: string
): Promise<{ success: boolean; message?: string }> => {
  const response = await apiClient.delete<{ success: boolean; message?: string }>(
    `/hostels/${hostelId}/facilities/${facilityKey}`
  );
  return response.data;
};

/**
 * Lists leave policies for a hostel.
 * GET /api/v1/hostel-ghar/hostels/:id/leave-types
 */
export interface LeaveType {
  id: string;
  name: string;
  slug?: string;
  maxDays?: number;
  description?: string | null;
  isPaid?: boolean;
  hostelId?: string;
}

export const getHostelLeaveTypes = async (
  id: string
): Promise<{ success: boolean; data: LeaveType[] }> => {
  const response = await apiClient.get<{ success: boolean; data: LeaveType[] }>(
    `/hostels/${id}/leave-types`
  );
  return response.data;
};

export interface ResidentFee {
  billingMonth: number;
  billingYear: number;
  amount: number;
  dueAmount: number;
  totalPayable: number;
  paidAmount: number;
  dueDate: string;
  status: string;
}

export interface ResidentHostelInfo {
  id: string;
  name: string | null;
  type: string | null;
  city: string | null;
  address: string | null;
}

export interface HostelResident {
  id: string;
  fullName?: string;
  name?: string;
  email: string | null;
  phone?: string | null;
  emergencyContact?: string | null;
  status?: string;
  hostelId?: string;
  hostelName?: string;
  hostel?: ResidentHostelInfo;
  joinedDate?: string | null;
  monthlyRent?: number | null;
  roomNumber: string | null;
  bedNumber: string | null;
  roomType: string | null;
  floor: number | null;
  flat: number | null;
  fee?: ResidentFee | null;
}

export interface HostelResidentsResponse {
  success: boolean;
  data: HostelResident[];
  isCached?: boolean;
  cacheLevel?: string;
  scope?: string;
}

/**
 * Gets the residents living in a specific hostel.
 * GET /api/v1/hostel-ghar/hostels/:id/residents
 * Requires role: admin, owner, or resident.
 */
export const getHostelResidents = async (id: string): Promise<HostelResidentsResponse> => {
  const response = await apiClient.get<HostelResidentsResponse>(`/hostels/${id}/residents`);
  return response.data;
};

export type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export interface CreateBedPayload {
  hostelId: string;
  floor: number;
  roomNumber: string;
  bedNumber: string;
  status?: BedStatus;
  rentAmount?: number;
}

export interface BedData {
  id: string;
  hostelId: string;
  roomId?: string;
  bedNumber: string;
  status: BedStatus;
  rentAmount?: number;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Creates a bed inside the selected room in a hostel.
 * POST /api/v1/hostel-ghar/beds
 * Requires role: owner or admin.
 */
export const createBed = async (
  payload: CreateBedPayload
): Promise<{ success: boolean; message: string; data: BedData }> => {
  const response = await apiClient.post<{ success: boolean; message: string; data: BedData }>(
    '/beds',
    payload
  );
  return response.data;
};

/**
 * Single-call bootstrap for the owner dashboard.
 * GET /api/v1/hostel-ghar/owner/dashboard
 * Requires role: owner or admin.
 */
export interface OwnerDashboardResponse {
  success: boolean;
  data: any;
  isCached?: boolean;
  cacheLevel?: string;
}

export const getOwnerDashboard = async (): Promise<OwnerDashboardResponse> => {
  const response = await apiClient.get<OwnerDashboardResponse>('/owner/dashboard');
  return response.data;
};

export interface HostelRatingResponse {
  success: boolean;
  data: {
    hostelId: string;
    rating?: number;
    averageRating: number;
    totalReviews: number;
    message?: string;
    recentRatings?: Array<{
      rating: number;
      comment?: string;
      userId?: string;
      createdAt: string;
    }>;
  };
}

/**
 * Submits an actual rating (1-5 stars) for a hostel to the backend.
 * POST /api/v1/hostel-ghar/hostels/:id/ratings
 */
export const submitHostelRating = async (
  hostelId: string,
  rating: number,
  comment?: string
): Promise<HostelRatingResponse> => {
  const response = await apiClient.post<HostelRatingResponse>(`/hostels/${hostelId}/ratings`, {
    rating,
    comment,
  });
  return response.data;
};

/**
 * Fetches the current ratings and review count for a hostel.
 * GET /api/v1/hostel-ghar/hostels/:id/ratings
 */
export const getHostelRatings = async (hostelId: string): Promise<HostelRatingResponse> => {
  const response = await apiClient.get<HostelRatingResponse>(`/hostels/${hostelId}/ratings`);
  return response.data;
};

/**
 * Fetches the weekly meal schedule for a hostel.
 * GET /api/v1/hostel-ghar/hostels/:id/meals
 */
export const getHostelMeals = async (hostelId: string): Promise<WeeklyMealResponse> => {
  const response = await apiClient.get<WeeklyMealResponse>(`/hostels/${hostelId}/meals`);
  return response.data;
};

/**
 * Fetches the daily meal schedule (दैनिक भोजन तालिका) for a hostel.
 * GET /api/v1/hostel-ghar/hostels/:id/meals/daily
 */
export const getHostelDailyMeals = async (
  hostelId: string
): Promise<{ success: boolean; data: any }> => {
  const response = await apiClient.get<{ success: boolean; data: any }>(
    `/hostels/${hostelId}/meals/daily`
  );
  return response.data;
};

/**
 * Fetches the public geographic location of a hostel (coordinates masked when isLocationShared is false).
 * GET /api/v1/hostel-ghar/hostels/:id/location
 */
export const getHostelLocation = async (hostelId: string): Promise<HostelLocationResponse> => {
  const response = await apiClient.get<HostelLocationResponse>(`/hostels/${hostelId}/location`);
  return response.data;
};
