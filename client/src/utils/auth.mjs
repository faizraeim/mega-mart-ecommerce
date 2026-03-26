const API_URL = import.meta.env.VITE_API_URL || '/api';

const auth = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getToken: () => localStorage.getItem('token'),

  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => !!localStorage.getItem('token'),

  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  authenticatedFetch: async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const requestUrl = url.startsWith("/") ? `${API_URL}${url}` : url;
    const response = await fetch(requestUrl, { ...options, headers });
    
    if (response.status === 401) {
      const data = await response.json().catch(() => ({}));
      if (data.message === 'Token is not valid' || data.message === 'No token, authorization denied') {
        auth.clearAuth();
        window.location.href = '/signin';
        throw new Error('Session expired. Please login again.');
      }
    }
    
    return response;
  },
};

export default auth;
