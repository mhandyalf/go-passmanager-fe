<template>
  <div :class="{ 'auth-shell': isAuthPage }">
    <header v-if="isAuthPage" class="auth-header">
      <div class="nav-card">
        <div class="brand">
          <div class="brand-icon">PW</div>
          <div>
            <p class="brand-kicker">Secure your vault</p>
            <h2>Gembols PW Manager</h2>
          </div>
        </div>
        <div class="nav-links">
          <router-link 
            to="/register" 
            class="nav-link"
            :class="{ active: route.path === '/register' }"
          >
            <span class="dot"></span>
            Create account
          </router-link>
          <router-link 
            to="/login" 
            class="nav-link"
            :class="{ active: route.path === '/login' }"
          >
            <span class="dot"></span>
            Sign in
          </router-link>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAuthPage = computed(() => ["/register", "/login"].includes(route.path));
</script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #e0f2fe);
}

.auth-header {
  padding: 2rem 1rem 0.5rem;
}

.nav-card {
  max-width: 960px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
}

.brand-kicker {
  margin: 0;
  color: #6b7280;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.brand h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 0.75rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.1rem;
  color: #0f172a;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.18s ease;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.nav-link .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.35);
}

.nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  border-color: rgba(59, 130, 246, 0.4);
}

.nav-link.active {
  color: #0b1b38;
  border-color: rgba(59, 130, 246, 0.9);
  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
  box-shadow: 0 12px 30px rgba(37, 99, 235, 0.18);
}

@media (max-width: 768px) {
  .nav-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    width: 100%;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>
