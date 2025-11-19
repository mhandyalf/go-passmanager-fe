<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p class="text-gray-600 text-sm">Please fill in your information to register</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="register" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <input 
                v-model="email" 
                type="email" 
                placeholder="Enter your email" 
                class="input-field"
                required 
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Username Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div class="relative">
              <input 
                v-model="username" 
                type="text" 
                placeholder="Enter your username" 
                class="input-field"
                required 
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Enter your password" 
                class="input-field pr-12"
                required 
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="submit-btn"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          </button>
        </form>

        <!-- Messages -->
        <div v-if="message" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-green-700 text-sm font-medium">{{ message }}</p>
          </div>
        </div>

        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 text-sm font-medium">{{ error }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
            Already have an account? 
            <a href="/login" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";

const email = ref("");
const username = ref("");
const password = ref("");
const message = ref("");
const error = ref("");
const isLoading = ref(false);
const showPassword = ref(false);

const register = async () => {
  try {
    isLoading.value = true;
    error.value = "";
    message.value = "";
    
    // Debug: Log data yang akan dikirim
    console.log('📝 Register Data:', {
      email: email.value,
      username: username.value,
      password: password.value ? '***' : 'empty'
    });
    
    const res = await api.post("/register", {
      email: email.value,
      username: username.value,
      password: password.value,
    });
    
    message.value = res.data.message || "Registration successful!";
    
    // Clear form on success
    setTimeout(() => {
      email.value = "";
      username.value = "";
      password.value = "";
    }, 2000);
    
  } catch (err) {
    console.error('❌ Registration Error:', err);
    
    // Detailed error handling
    if (err.code === 'NETWORK_ERROR' || err.message === 'Network Error') {
      error.value = "Cannot connect to server. Please check if the API server is running.";
    } else if (err.response) {
      // Server responded with error status
      const status = err.response.status;
      const errorMsg = err.response.data?.error || err.response.data?.message || "Registration failed";
      
      if (status === 400) {
        error.value = `Bad Request: ${errorMsg}`;
      } else if (status === 409) {
        error.value = "User already exists with this email or username";
      } else if (status >= 500) {
        error.value = "Server error. Please try again later.";
      } else {
        error.value = errorMsg;
      }
    } else if (err.request) {
      // Request was made but no response
      error.value = "No response from server. Please check your internet connection.";
    } else {
      // Something else happened
      error.value = `Registration failed: ${err.message}`;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@reference "../style.css";
.input-field {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg bg-white;
  @apply focus:ring-2 focus:outline-none;
  @apply placeholder-gray-400 text-gray-900;
  @apply transition-all duration-200 ease-in-out;
  border-color: #d1d5db;
}

.input-field:hover {
  @apply border-gray-400;
}

.input-field:focus {
  border-color: var(--brand-500);
  box-shadow: 0 0 0 3px rgba(248, 117, 170, 0.25);
}

.submit-btn {
  @apply w-full text-white py-3 px-4 rounded-lg font-semibold;
  @apply focus:outline-none;
  @apply transition-all duration-200 ease-in-out;
  background-color: var(--brand-500);
  border: 1px solid var(--brand-500);
  box-shadow: 0 10px 20px rgba(248, 117, 170, 0.25);
}

.submit-btn:active:not(:disabled) {
  @apply transform scale-95;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--brand-600);
  border-color: var(--brand-600);
}

.submit-btn:disabled {
  background-color: var(--brand-300);
  border-color: var(--brand-300);
  @apply cursor-not-allowed;
}
</style>
