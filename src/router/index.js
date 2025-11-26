// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Faq from "../views/Faq.vue";
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
      if (auth.isAuthenticated()) {
        next('/dashboard');
      } else {
        next();
      }
    }
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
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
