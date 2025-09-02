// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../utils/auth.js'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      // Kalau sudah login, redirect ke dashboard
      if (auth.isAuthenticated()) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/register', 
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      // Kalau sudah login, redirect ke dashboard
      if (auth.isAuthenticated()) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard', 
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      // Route protection - harus login dulu
      if (auth.isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router