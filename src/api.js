// api.js atau api/index.js
import axios from 'axios';

// Ganti dengan URL backend Anda
const API_BASE_URL = window._env_.VITE_API_URL //prod
// const API_BASE_URL = import.meta.env.VITE_API_URL //dev

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - otomatis include token di setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle expired token atau unauthorized
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid
      localStorage.removeItem('token');
      // Redirect ke login page
      window.location.href = '/login'; // Atau gunakan Vue Router
    }
    return Promise.reject(error);
  }
);

export default api;