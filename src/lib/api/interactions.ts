import apiClient from './client';

export interface LikedHostelsResponse {
  success: boolean;
  data: {
    likedHostelIds: string[];
    hostels: any[];
    total: number;
  };
}

export interface ToggleLikeResponse {
  success: boolean;
  message: string;
  data: {
    liked: boolean;
    likeCount: number;
  };
}

export interface ContactMessageData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface HostelListingRequestData {
  hostelName: string;
  type: string;
  totalBeds: number | string;
  phone: string;
  city: string;
  area?: string;
  address: string;
  priceFrom?: number | string | null;
  negotiable?: boolean;
  amenities?: string[];
  description?: string;
  rules?: string;
  photos?: string[];
  ownerName: string;
  email: string;
}

/**
 * Toggle like for a hostel (add to / remove from favorites)
 */
export async function toggleHostelLike(hostelId: string): Promise<ToggleLikeResponse> {
  const response = await apiClient.post<ToggleLikeResponse>(`/hostels/${hostelId}/like`);
  return response.data;
}

/**
 * Fetch list of hostels liked by the current user / guest device
 */
export async function getUserLikedHostels(): Promise<LikedHostelsResponse> {
  const response = await apiClient.get<LikedHostelsResponse>('/hostels/user/likes');
  return response.data;
}

/**
 * Submit contact inquiry message
 */
export async function submitContactMessage(data: ContactMessageData) {
  const response = await apiClient.post('/contact', data);
  return response.data;
}

/**
 * Submit hostel listing request
 */
export async function submitHostelListingRequest(data: HostelListingRequestData) {
  const response = await apiClient.post('/hostels/listing-request', data);
  return response.data;
}

/**
 * Subscribe to newsletter updates
 */
export async function subscribeToNewsletter(email: string, source: string = 'website-footer') {
  const response = await apiClient.post('/newsletter/subscribe', { email, source });
  return response.data;
}
