import axios from 'axios';

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
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if running in browser and token exists
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
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
  (error) => {
    // Handle unauthorized errors gracefully without disrupting public browsing
    if (error.response?.status === 401 && typeof window !== 'undefined') {
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
        pathname.startsWith('/forgot-password');

      localStorage.removeItem('token');
      if (!isPublicRoute) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
