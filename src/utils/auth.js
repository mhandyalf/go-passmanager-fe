// src/utils/auth.js - Utility functions untuk authentication
export const auth = {
  // Check apakah user sudah login
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Basic check - di production sebaiknya juga cek expiry
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      
      // Check if token expired
      if (payload.exp && payload.exp < now) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Atau gunakan Vue Router
  },

  // Get user info from token (optional)
  getUserInfo() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.user_id,
        username: payload.username,
        // tambahkan field lain sesuai JWT payload kamu
      };
    } catch (error) {
      return null;
    }
  }
};

// Vue composable untuk authentication (optional)
import { ref, computed } from 'vue';

export function useAuth() {
  const isLoggedIn = ref(auth.isAuthenticated());
  
  const user = computed(() => auth.getUserInfo());
  
  const login = (token) => {
    localStorage.setItem('token', token);
    isLoggedIn.value = true;
  };
  
  const logout = () => {
    auth.logout();
    isLoggedIn.value = false;
  };
  
  return {
    isLoggedIn,
    user,
    login,
    logout
  };
}