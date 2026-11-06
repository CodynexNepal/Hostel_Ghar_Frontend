import apiClient from './client';
import { clearAuthSession, checkAuthStatus } from './token';

export {
  isTokenExpired,
  getStoredToken,
  getStoredRefreshToken,
  clearAuthSession,
  checkAuthStatus,
} from './token';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    accessToken?: string;
    refreshToken?: string;
    user: AuthUser;
  };
  message?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword?: string;
}

export interface ResetPasswordResponse {
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
    const token = data.token || data.accessToken || data.access_token;
    const refreshToken = data.refreshToken || data.refresh_token;
    const user = data.user;

    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('access_token', token);
    }
    if (refreshToken && typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refresh_token', refreshToken);
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
export const register = async (
  payload:
    | RegisterRequest
    | {
        fullName?: string;
        firstName?: string;
        lastName?: string;
        email: string;
        password: string;
        phone?: string;
      }
): Promise<AuthResponse> => {
  let firstName = payload.firstName;
  let lastName = payload.lastName;

  if ((!firstName || !lastName) && 'fullName' in payload && payload.fullName) {
    const parts = payload.fullName.trim().split(/\s+/);
    firstName = parts[0] || '';
    lastName = parts.slice(1).join(' ') || parts[0] || '';
  }

  // Strictly send only whitelisted fields to pass backend DTO validation
  const body = {
    firstName: (firstName || '').trim(),
    lastName: (lastName || '').trim(),
    email: payload.email.trim(),
    password: payload.password,
  };

  try {
    const response = await apiClient.post<any>('/auth/register', body);
    const data = response.data?.data || {};
    const token = data.token || data.accessToken || data.access_token;
    const refreshToken = data.refreshToken || data.refresh_token;
    const user = data.user
      ? {
          ...data.user,
          fullName:
            data.user.fullName ||
            [data.user.firstName, data.user.lastName].filter(Boolean).join(' ') ||
            data.user.email,
        }
      : null;

    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('access_token', token);
    }
    if (refreshToken && typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('refresh_token', refreshToken);
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
  // If tokens are expired client-side, do not attempt request
  if (typeof window !== 'undefined' && !checkAuthStatus()) {
    clearAuthSession();
    return null;
  }

  try {
    const response = await apiClient.get<any>('/auth/me');
    const user = response.data?.data?.user;
    if (user && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('is_logged_in', 'true');
      return user;
    }
    return null;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearAuthSession();
    }
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
 * Resets a user's password using the token received in email.
 * POST /api/v1/hostel-ghar/auth/reset-password
 */
export const resetPassword = async (
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', {
      token: payload.token,
      password: payload.password,
      confirmPassword: payload.confirmPassword || payload.password,
      newPassword: payload.password,
    });
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

/**
 * Clears the stored auth tokens and logs out on backend.
 * POST /api/v1/hostel-ghar/auth/logout
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (err) {
    console.warn('Backend logout encountered error:', err);
  } finally {
    clearAuthSession();
  }
};

function handleAuthError(error: any): AuthApiError {
  const status = error.response?.status;
  const data = error.response?.data;
  let message =
    data?.message || data?.error || error.message || 'Authentication failed. Please try again.';

  if (data?.errors && Array.isArray(data.errors)) {
    const errorMessages = data.errors
      .map((item: any) => (Array.isArray(item.messages) ? item.messages.join(', ') : item.field))
      .filter(Boolean);
    if (errorMessages.length > 0) {
      message = errorMessages.join('. ');
    }
  }

  const errors = data?.errors;
  return new AuthApiError(message, status, errors);
}
