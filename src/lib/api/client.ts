import axios from 'axios';
import { getStoredToken, getStoredRefreshToken, isTokenExpired, clearAuthSession } from './token';

const getBaseURL = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) {
    return 'https://api.hostelghar.com/api/v1/hostel-ghar';
  }
  // If env URL is the root domain without /api, ensure the API version prefix is present
  if (
    envUrl.startsWith('http') &&
    !envUrl.includes('/api/v1/hostel-ghar') &&
    !envUrl.endsWith('/api')
  ) {
    return `${envUrl.replace(/\/+$/, '')}/api/v1/hostel-ghar`;
  }
  return envUrl;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if running in browser and token exists
    if (typeof window !== 'undefined') {
      const token = getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized errors gracefully
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const originalRequest = error.config;

      // Attempt token refresh if refresh token exists and hasn't been retried yet
      if (originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getStoredRefreshToken();

        if (refreshToken && !isTokenExpired(refreshToken)) {
          try {
            const refreshRes = await axios.post(
              `${getBaseURL()}/auth/refresh`,
              { refreshToken, refresh_token: refreshToken },
              { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );

            const data = refreshRes.data?.data || {};
            const newToken = data.token || data.accessToken || data.access_token;
            const newRefreshToken = data.refreshToken || data.refresh_token;

            if (newToken) {
              localStorage.setItem('token', newToken);
              localStorage.setItem('accessToken', newToken);
              localStorage.setItem('access_token', newToken);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
                localStorage.setItem('refresh_token', newRefreshToken);
              }
              window.dispatchEvent(new Event('auth_state_changed'));
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
          } catch {
            // Refresh failed: tokens are expired/invalid
          }
        }
      }

      // If refresh was unsuccessful or tokens are expired, purge auth session
      clearAuthSession();

      const pathname = window.location.pathname;
      const isPublicRoute =
        pathname === '/' ||
        pathname.startsWith('/hostel') ||
        pathname.startsWith('/about') ||
        pathname.startsWith('/contact') ||
        pathname.startsWith('/faq') ||
        pathname.startsWith('/guides') ||
        pathname.startsWith('/pricing') ||
        pathname.startsWith('/for-owners') ||
        pathname.startsWith('/how-it-works') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/reset-password');

      if (!isPublicRoute) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
