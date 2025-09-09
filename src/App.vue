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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
              linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: 20px 20px;
  animation: movePattern 20s linear infinite;
  pointer-events: none;
}

@keyframes movePattern {
  0% { transform: translateX(0); }
  100% { transform: translateX(40px); }
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
  padding: 0.75rem 1.5rem;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
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