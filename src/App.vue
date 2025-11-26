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
          <router-link 
            to="/faq" 
            class="nav-link"
            :class="{ active: route.path === '/faq' }"
          >
            <span class="dot"></span>
            Why it's safe?
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
const isAuthPage = computed(() => ["/register", "/login", "/faq"].includes(route.path));
</script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f7, #f7c6d9);
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
  background: linear-gradient(135deg, #f189b2, #f875aa);
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
  border: 1px solid rgba(248, 117, 170, 0.35);
  background: rgba(255, 255, 255, 0.98);
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.18s ease;
  box-shadow: 0 6px 16px rgba(248, 117, 170, 0.15);
}

.nav-link .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f189b2, #f875aa);
  box-shadow: 0 4px 10px rgba(248, 117, 170, 0.4);
}

.nav-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(248, 117, 170, 0.2);
  border-color: rgba(248, 117, 170, 0.55);
}

.nav-link.active {
  color: #0b1b38;
  border-color: rgba(248, 117, 170, 0.9);
  background: linear-gradient(135deg, #fde7f2, #f7c6d9);
  box-shadow: 0 12px 30px rgba(248, 117, 170, 0.25);
}

@media (max-width: 768px) {
  .nav-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
</style>
