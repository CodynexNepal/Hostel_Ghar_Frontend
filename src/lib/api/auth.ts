import apiClient from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: AuthUser;
  };
  message?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export class AuthApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

/**
 * Authenticates a user and persists the auth token.
 * POST /api/v1/hostel-ghar/auth/login
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<any>('/auth/login', credentials);
    const data = response.data?.data || {};
    const token = data.token || data.accessToken;
    const user = data.user;

    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('is_logged_in', 'true');
      window.dispatchEvent(new Event('auth_state_changed'));
    }
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

/**
 * Creates a new user account.
 * POST /api/v1/hostel-ghar/auth/register
 */
export const register = async (payload: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<any>('/auth/register', payload);
    const data = response.data?.data || {};
    const token = data.token || data.accessToken;
    const user = data.user;

    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('is_logged_in', 'true');
      window.dispatchEvent(new Event('auth_state_changed'));
    }
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

/**
 * Gets the currently authenticated user.
 * GET /api/v1/hostel-ghar/auth/me
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const response = await apiClient.get<any>('/auth/me');
    const user = response.data?.data?.user;
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('is_logged_in', 'true');
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Queues a password-reset email for the given email address.
 * POST /api/v1/hostel-ghar/auth/forgot-password
 */
export const forgotPassword = async (
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

/**
 * Clears the stored auth token and logs out on backend.
 * POST /api/v1/hostel-ghar/auth/logout
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (err) {
    console.warn('Backend logout encountered error:', err);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('is_logged_in');
      window.dispatchEvent(new Event('auth_state_changed'));
    }
  }
};

function handleAuthError(error: any): AuthApiError {
  const status = error.response?.status;
  const data = error.response?.data;
  const message =
    data?.message || data?.error || error.message || 'Authentication failed. Please try again.';
  const errors = data?.errors;
  return new AuthApiError(message, status, errors);
}
