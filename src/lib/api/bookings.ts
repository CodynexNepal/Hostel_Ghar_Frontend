import apiClient from './client';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REJECTED';

export interface CreateBookingRequest {
  hostelId: string;
  checkInDate: string; // ISO date format YYYY-MM-DD
  remarks?: string;
  studentName?: string;
  phone?: string;
  email?: string;
}

export interface BookingHostelInfo {
  id: string;
  name: string;
  type?: string | null;
  city?: string | null;
  address?: string | null;
  logoUrl?: string | null;
  phone?: string | null;
}

export interface BookingUserInfo {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface BookingItem {
  id: string;
  userId: string;
  hostelId: string;
  checkInDate: string;
  remarks: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  hostel?: BookingHostelInfo;
  user?: BookingUserInfo;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: BookingItem;
}

export interface BookingPagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MyBookingsResponse {
  success: boolean;
  data: BookingItem[];
  pagination: BookingPagination;
  isCached?: boolean;
  cacheLevel?: string;
}

export interface HostelBookingsResponse {
  success: boolean;
  data: BookingItem[];
  pagination: BookingPagination;
  isCached?: boolean;
  cacheLevel?: string;
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}

export interface BookingActionResponse {
  success: boolean;
  data: BookingItem;
  message?: string;
}

export interface BookingListParams {
  page?: number;
  limit?: number;
}

/**
 * Generate a unique idempotency key for booking creation.
 */
export const generateIdempotencyKey = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * POST /bookings
 * Requires role: user.
 * Creates a booking request with required Idempotency-Key header.
 */
export const createBooking = async (
  payload: CreateBookingRequest,
  idempotencyKey?: string
): Promise<CreateBookingResponse> => {
  const key = idempotencyKey || generateIdempotencyKey();
  // Strictly send only fields accepted by backend CreateBookingDto to pass DTO validation
  const body: { hostelId: string; checkInDate: string; remarks?: string } = {
    hostelId: payload.hostelId,
    checkInDate: payload.checkInDate,
  };
  if (payload.remarks !== undefined) {
    body.remarks = payload.remarks;
  }
  const response = await apiClient.post<CreateBookingResponse>('/bookings', body, {
    headers: {
      'Idempotency-Key': key,
    },
  });
  return response.data;
};

/**
 * GET /bookings/my-bookings
 * Requires role: user.
 * Lists the authenticated user's bookings with pagination.
 */
export const getMyBookings = async (
  params: BookingListParams = {}
): Promise<MyBookingsResponse> => {
  const { page = 1, limit = 10 } = params;
  const response = await apiClient.get<MyBookingsResponse>('/bookings/my-bookings', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * GET /bookings/hostels/:hostelId
 * Requires role: owner or admin.
 * Lists booking requests for a specific hostel.
 */
export const getHostelBookings = async (
  hostelId: string,
  params: BookingListParams = {}
): Promise<HostelBookingsResponse> => {
  const { page = 1, limit = 10 } = params;
  const response = await apiClient.get<HostelBookingsResponse>(`/bookings/hostels/${hostelId}`, {
    params: { page, limit },
  });
  return response.data;
};

/**
 * PATCH /bookings/:id/status
 * Requires role: owner or admin.
 * Updates a booking's status (CONFIRMED, REJECTED, etc.).
 */
export const updateBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<BookingActionResponse> => {
  const response = await apiClient.patch<BookingActionResponse>(`/bookings/${id}/status`, {
    status,
  });
  return response.data;
};

/**
 * DELETE /bookings/:id
 * Requires role: user.
 * Cancels the authenticated user's booking.
 */
export const cancelBooking = async (id: string): Promise<BookingActionResponse> => {
  const response = await apiClient.delete<BookingActionResponse>(`/bookings/${id}`);
  return response.data;
};
