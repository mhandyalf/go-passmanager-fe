<template>
  <div>
    <!-- Beautiful Navbar hanya muncul di /register dan /login -->
    <nav v-if="['/register', '/login'].includes(route.path)" class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h2>Gembols PW Manager</h2>
        </div>
        <div class="nav-links">
          <router-link 
            to="/register" 
            class="nav-link"
            :class="{ 'active': route.path === '/register' }"
          >
            <i class="icon">📝</i>
            Register
          </router-link>
          <router-link 
            to="/login" 
            class="nav-link"
            :class="{ 'active': route.path === '/login' }"
          >
            <i class="icon">🔐</i>
            Login
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Router outlet -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
.navbar {
  background: #1f3d91;
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.nav-brand h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  background: #ffffff;
  color: #1f3d91;
  border-color: #ffffff;
  box-shadow: 0 10px 25px rgba(17, 24, 39, 0.15);
}

.nav-link .icon {
  font-size: 1.1rem;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-brand h2 {
    font-size: 1.5rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: center;
  }
  
  .nav-link {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
  
  .nav-link {
    width: 200px;
    justify-content: center;
  }
}
</style>