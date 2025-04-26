import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/features/landing/pages/LandingPage.vue'
import LoginPage from '@/features/auth/pages/LoginPage.vue'
import RegisterPage from '@/features/auth/pages/RegisterPage.vue'
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue'
import ProjectsPage from '@/features/project/pages/ProjectsPage.vue'
import OrdersPage from '@/features/order/pages/OrdersPage.vue'
import ShippingsPage from '@/features/shipping/pages/ShippingsPage.vue'
import UsersPage from '@/features/user/pages/UsersPage.vue'
import UserCreatePage from '@/features/user/pages/UserCreatePage.vue'
import UserDetailPage from '@/features/user/pages/UserDetailPage.vue'
import RolesPage from '@/features/role/pages/RolesPage.vue'
import PermissionsPage from '@/features/permission/pages/PermissionsPage.vue'
import OrganizationsPage from '@/features/organization/pages/OrganizationsPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  // Admin pages
  { path: '/dashboard', component: DashboardPage },
  { path: '/projects', component: ProjectsPage },
  { path: '/orders', component: OrdersPage },
  { path: '/shippings', component: ShippingsPage },
  // Admin settings
  { path: '/users', component: UsersPage },
  { path: '/users/create', component: UserCreatePage },
  { path: '/users/:id', component: UserDetailPage },
  { path: '/roles', component: RolesPage },
  { path: '/permissions', component: PermissionsPage },
  { path: '/organizations', component: OrganizationsPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
