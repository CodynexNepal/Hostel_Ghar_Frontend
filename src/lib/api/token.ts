/**
 * Authentication and Token Management Utilities
 * Handles JWT expiration checks, token storage retrieval, and session cleanup.
 */

/**
 * Checks if a JWT token is expired based on its standard `exp` claim.
 * Returns true if expired, invalid, or null.
 * Returns false if still valid or if the token is not a JWT (opaque token).
 */
export const isTokenExpired = (token: string | null | undefined): boolean => {
  if (!token || typeof token !== 'string') return true;

  try {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      // Non-JWT or opaque token: client cannot decode exp claim
      return false;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    if (typeof payload.exp === 'number') {
      // Add 5-second buffer for clock skew
      return Date.now() >= (payload.exp - 5) * 1000;
    }

    return false;
  } catch {
    // If decoding or parsing fails, consider the token invalid/expired
    return true;
  }
};

/**
 * Retrieves the stored access token from localStorage.
 */
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return (
    localStorage.getItem('token') ||
    localStorage.getItem('accessToken') ||
    localStorage.getItem('access_token')
  );
};

/**
 * Retrieves the stored refresh token from localStorage.
 */
export const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken') || localStorage.getItem('refresh_token');
};

/**
 * Completely purges all auth-related items from localStorage
 * and notifies listeners of the auth state change.
 */
export const clearAuthSession = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('is_logged_in');

  window.dispatchEvent(new Event('auth_state_changed'));
};

/**
 * Determines whether the user has a valid active session.
 * If access_token and refresh_token are expired, purges the session
 * and returns false so the user is NOT shown logged in.
 */
export const checkAuthStatus = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = getStoredToken();
  const refreshToken = getStoredRefreshToken();

  // If no token exists at all
  if (!token && !refreshToken) {
    // Clean up any stale user or is_logged_in data
    if (localStorage.getItem('user') || localStorage.getItem('is_logged_in')) {
      clearAuthSession();
    }
    return false;
  }

  const isAccessTokenExpired = Boolean(token && isTokenExpired(token));
  const isRefreshExpired = Boolean(refreshToken ? isTokenExpired(refreshToken) : true);

  // If access token is expired (or missing) and refresh token is also expired (or missing)
  if ((!token || isAccessTokenExpired) && isRefreshExpired) {
    clearAuthSession();
    return false;
  }

  // If access token is valid
  if (token && !isAccessTokenExpired) {
    return true;
  }

  // If access token is expired but refresh token is still valid
  if (refreshToken && !isRefreshExpired) {
    return true;
  }

  return false;
};
