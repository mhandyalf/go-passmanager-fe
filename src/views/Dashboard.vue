<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Password Manager</h1>
            <p class="text-gray-600">Manage your passwords securely</p>
          </div>
          <div class="flex gap-3">
            <button 
              @click="logout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
            <button 
              @click="showAddModal = true"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Password
            </button>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
        <div class="flex gap-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search passwords by title or username..." 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button 
            @click="loadPasswords"
            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Passwords Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="password in filteredPasswords" 
          :key="password.id"
          class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-200"
        >
          <!-- Card Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ password.title }}</h3>
              <p class="text-sm text-gray-600">{{ password.username || 'No username' }}</p>
            </div>
            <div class="flex gap-2">
              <button 
                @click="editPassword(password)"
                class="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button 
                @click="deletePassword(password.id)"
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Password Field -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="flex gap-2">
              <div class="flex-1 bg-gray-50 px-3 py-2 rounded-lg border">
                <span class="text-gray-900 font-mono text-sm">
                  {{ showPasswords[password.id] ? decryptedPasswords[password.id] || '••••••••' : '••••••••' }}
                </span>
              </div>
              <button 
                @click="togglePasswordVisibility(password)"
                class="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg v-if="!showPasswords[password.id]" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
              <button 
                @click="copyToClipboard(password)"
                class="p-2 text-gray-400 hover:text-green-500 border border-gray-300 rounded-lg hover:bg-green-50 transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="password.tags" class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in password.tags.split(',')" 
                :key="tag"
                class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
              >
                {{ tag.trim() }}
              </span>
            </div>
          </div>

          <!-- Created Date -->
          <div class="text-xs text-gray-500">
            Created: {{ formatDate(password.created_at) }}
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="passwords.length === 0 && !isLoading" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No passwords yet</h3>
        <p class="text-gray-600 mb-4">Start by adding your first password</p>
        <button 
          @click="showAddModal = true"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Add Your First Password
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">Loading passwords...</p>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          {{ showEditModal ? 'Edit Password' : 'Add New Password' }}
        </h2>

        <form @submit.prevent="showEditModal ? updatePassword() : createPassword()" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input 
              v-model="passwordForm.title" 
              type="text" 
              placeholder="e.g., Gmail, Facebook, Work Email" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              required 
            />
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username/Email</label>
            <input 
              v-model="passwordForm.username" 
              type="text" 
              placeholder="username or email" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <div class="relative">
              <input 
                v-model="passwordForm.password" 
                :type="showFormPassword ? 'text' : 'password'" 
                placeholder="Enter password" 
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                required 
              />
              <button 
                type="button" 
                @click="showFormPassword = !showFormPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg v-if="!showFormPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
            <button 
              type="button" 
              @click="generatePassword"
              class="mt-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              Generate Strong Password
            </button>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input 
              v-model="passwordForm.tags" 
              type="text" 
              placeholder="work, personal, social (comma separated)" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <!-- Buttons -->
          <div class="flex gap-3 pt-4">
            <button 
              type="button" 
              @click="closeModal"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
            >
              {{ isSubmitting ? 'Saving...' : (showEditModal ? 'Update' : 'Add') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {{ message }}
    </div>
    <div v-if="error" class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api"; // Pastikan ini sesuai dengan struktur project kamu

// State variables
const passwords = ref([]);
const searchQuery = ref("");
const isLoading = ref(false);
const isSubmitting = ref(false);
const message = ref("");
const error = ref("");

// Modal states
const showAddModal = ref(false);
const showEditModal = ref(false);
const showFormPassword = ref(false);

// Password visibility tracking
const showPasswords = ref({});
const decryptedPasswords = ref({});

// Form data
const passwordForm = ref({
  id: null,
  title: "",
  username: "",
  password: "",
  tags: ""
});

// Computed
const filteredPasswords = computed(() => {
  if (!searchQuery.value) return passwords.value;
  
  const query = searchQuery.value.toLowerCase();
  return passwords.value.filter(password => 
    password.title.toLowerCase().includes(query) ||
    (password.username && password.username.toLowerCase().includes(query)) ||
    (password.tags && password.tags.toLowerCase().includes(query))
  );
});

// Methods
const loadPasswords = async () => {
  try {
    isLoading.value = true;
    error.value = "";
    
    const response = await api.get("/passwords");
    passwords.value = response.data.data || [];
    
  } catch (err) {
    error.value = "Failed to load passwords";
    console.error("Load passwords error:", err);
  } finally {
    isLoading.value = false;
  }
};

const createPassword = async () => {
  try {
    isSubmitting.value = true;
    error.value = "";
    
    const response = await api.post("/passwords", {
      title: passwordForm.value.title,
      username: passwordForm.value.username,
      password: passwordForm.value.password,
      tags: passwordForm.value.tags
    });
    
    const newPassword = response.data.data;
    
    // PENTING: Pastikan ada decrypted_password untuk toggle
    if (!newPassword.decrypted_password) {
      newPassword.decrypted_password = passwordForm.value.password;
    }
    
    passwords.value.push(newPassword);
    message.value = "Password added successfully!";
    closeModal();
    clearMessage();
    
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to create password";
    clearMessage();
  } finally {
    isSubmitting.value = false;
  }
};

const editPassword = (password) => {
  passwordForm.value = {
    id: password.id,
    title: password.title,
    username: password.username || "",
    password: "", // Don't pre-fill password for security
    tags: password.tags || ""
  };
  showEditModal.value = true;
};

const updatePassword = async () => {
  try {
    isSubmitting.value = true;
    error.value = "";
    
    const updateData = {
      title: passwordForm.value.title,
      username: passwordForm.value.username,
      tags: passwordForm.value.tags
    };
    
    // Only include password if it's not empty
    if (passwordForm.value.password) {
      updateData.encrypted_password = passwordForm.value.password;
    }
    
    const response = await api.put(`/passwords/${passwordForm.value.id}`, updateData);
    
    // Update the password in the list
    const index = passwords.value.findIndex(p => p.id === passwordForm.value.id);
    if (index !== -1) {
      passwords.value[index] = response.data.data;
    }
    
    message.value = "Password updated successfully!";
    closeModal();
    clearMessage();
    
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to update password";
    clearMessage();
  } finally {
    isSubmitting.value = false;
  }
};

const deletePassword = async (id) => {
  if (!confirm("Are you sure you want to delete this password?")) {
    return;
  }
  
  try {
    error.value = "";
    
    await api.delete(`/passwords/${id}`);
    
    passwords.value = passwords.value.filter(p => p.id !== id);
    message.value = "Password deleted successfully!";
    clearMessage();
    
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to delete password";
    clearMessage();
  }
};

const togglePasswordVisibility = async (password) => {
  if (showPasswords.value[password.id]) {
    // Hide password
    showPasswords.value[password.id] = false;
    delete decryptedPasswords.value[password.id];
  } else {
    // Show password (pakai field baru dari backend)
    showPasswords.value[password.id] = true;
    decryptedPasswords.value[password.id] = password.decrypted_password;
  }
};

const copyToClipboard = async (password) => {
  try {
    const passwordToCopy = decryptedPasswords.value[password.id] || password.decrypted_password;
    await navigator.clipboard.writeText(passwordToCopy);
    message.value = "Password copied to clipboard!";
    clearMessage();
  } catch (err) {
    error.value = "Failed to copy password";
    clearMessage();
  }
};

const generatePassword = () => {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  passwordForm.value.password = password;
};

const closeModal = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  showFormPassword.value = false;
  passwordForm.value = {
    id: null,
    title: "",
    username: "",
    password: "",
    tags: ""
  };
};

const clearMessage = () => {
  setTimeout(() => {
    message.value = "";
    error.value = "";
  }, 3000);
};

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const logout = () => {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    
    passwords.value = [];
    message.value = "Logged out successfully!";
    
    // Langsung redirect dengan window.location
    setTimeout(() => {
      window.location.href = '/login';
      // Atau kalau login page di root: window.location.href = '/';
    }, 500);
    
  } catch (err) {
    error.value = "Failed to logout";
    console.error("Logout error:", err);
  }
};

// Lifecycle
onMounted(() => {
  loadPasswords();
});
</script>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: fadeInUp 0.3s ease-out;
}
</style>