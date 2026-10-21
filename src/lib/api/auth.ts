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
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    const { token } = response.data.data;
    if (token) {
      localStorage.setItem('token', token);
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
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
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
    const response = await apiClient.post<ForgotPasswordResponse>(
      '/auth/forgot-password',
      payload
    );
    return response.data;
  } catch (error: any) {
    throw handleAuthError(error);
  }
};

/**
 * Clears the stored auth token (logout).
 */
export const logout = (): void => {
  localStorage.removeItem('token');
};

function handleAuthError(error: any): AuthApiError {
  const status = error.response?.status;
  const data = error.response?.data;
  const message =
    data?.message || data?.error || error.message || 'Authentication failed. Please try again.';
  const errors = data?.errors;
  return new AuthApiError(message, status, errors);
}