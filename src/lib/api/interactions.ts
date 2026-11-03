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

function getLocalClientId(): string {
  if (typeof window === 'undefined') return '';
  let clientId = localStorage.getItem('hg_client_id');
  if (!clientId) {
    clientId = 'c_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('hg_client_id', clientId);
  }
  return clientId;
}

/**
 * Toggle like for a hostel (add to / remove from favorites)
 */
export async function toggleHostelLike(hostelId: string): Promise<ToggleLikeResponse> {
  const clientId = getLocalClientId();
  const response = await apiClient.post<ToggleLikeResponse>(`/hostels/${hostelId}/like`, {
    clientId,
  });
  return response.data;
}

/**
 * Fetch list of hostels liked by the current user / guest device
 */
export async function getUserLikedHostels(): Promise<LikedHostelsResponse> {
  const clientId = getLocalClientId();
  const response = await apiClient.get<LikedHostelsResponse>('/hostels/user/likes', {
    params: clientId ? { clientId } : undefined,
  });
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
