import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/features/landing/pages/LandingPage.vue'
import LoginPage from '@/features/auth/pages/LoginPage.vue'
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue'
import PermissionsPage from '@/features/permission/pages/PermissionsPage.vue'
import UsersPage from '@/features/user/pages/UsersPage.vue'
import RolesPage from '@/features/role/pages/RolesPage.vue'
import ProjectsPage from '@/features/project/pages/ProjectsPage.vue'
import OrdersPage from '@/features/order/pages/OrdersPage.vue'
import ShippingsPage from '@/features/shipping/pages/ShippingsPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/permissions', component: PermissionsPage },
  { path: '/users', component: UsersPage },
  { path: '/roles', component: RolesPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/orders', component: OrdersPage },
  { path: '/shippings', component: ShippingsPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
