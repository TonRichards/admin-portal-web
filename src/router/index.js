import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/features/landing/pages/LandingPage.vue'
import LoginPage from '@/features/auth/pages/LoginPage.vue'
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue'
import PermissionsPage from '@/features/permission/pages/PermissionsPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/permissions', component: PermissionsPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
