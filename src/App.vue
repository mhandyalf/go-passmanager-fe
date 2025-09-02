<template>
  <div>
    <!-- Navbar hanya muncul di /register dan /login -->
    <nav v-if="['/register', '/login'].includes(route.path)" style="margin-bottom: 20px">
      <router-link to="/register" style="margin-right: 10px">Register</router-link>
      <router-link to="/login">Login</router-link>
    </nav>

    <!-- Router outlet -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
