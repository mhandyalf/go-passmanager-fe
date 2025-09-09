<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 class="text-2xl font-bold text-gray-900 mb-6 text-center">Reset Password</h1>
        
        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Enter new password" 
              class="input-field"
              required
            />
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="submit-btn"
          >
            <span v-if="!isLoading">Reset Password</span>
            <span v-else>Processing...</span>
          </button>
        </form>

        <div v-if="message" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700 text-sm font-medium">{{ message }}</p>
        </div>

        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 text-sm font-medium">{{ error }}</p>
        </div>

        <div class="mt-6 text-center">
          <router-link to="/login" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">
            Back to login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "../api";

const password = ref("");
const message = ref("");
const error = ref("");
const isLoading = ref(false);

const route = useRoute(); 
const token = route.query.token; // Ambil token dari URL

const submit = async () => {
  try {
    isLoading.value = true;
    error.value = "";
    message.value = "";

    await api.post("/reset-password", { 
      token,
      new_password: password.value 
    });

    message.value = "Password has been reset successfully!";
    password.value = "";
  } catch (err) {
    error.value = err.response?.data?.error || "Reset failed.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@reference "../style.css";
</style>
