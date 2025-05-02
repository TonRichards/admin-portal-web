import { createRouter, createWebHistory } from 'vue-router'
import { useOrganizationStore } from '@/stores/organizationStore'
import RequireOrgModal from '@/components/RequireOrgModal.vue'
import RequireLoginModal from '@/components/RequireLoginModal.vue'
import { createVNode, render } from 'vue'

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

import { checkAuth } from '@/lib/axiosUser'

const routes = [
  { path: '/', component: LandingPage, meta: { public: true }},
  { path: '/login', component: LoginPage, meta: { public: true }},
  { path: '/register', component: RegisterPage, meta: { public: true }},
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
  { path: '/organizations', component: OrganizationsPage, meta: { public: true }},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

let modalVm = null

router.beforeEach(async (to, from) => {
  if (to.meta.public) return true

  const orgStore = useOrganizationStore()
  const user = await checkAuth()

  if (!user) {
    if (!modalVm) {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const vnode = createVNode(RequireLoginModal, {
        onLogin: () => {
          render(null, container)
          modalVm = null
          router.push('/login')
        },
        onRegister: () => {
          render(null, container)
          modalVm = null
          router.push('/register')
        },
      })

      render(vnode, container)
      modalVm = vnode
    }
  }

  await orgStore.init()

  if (!orgStore.currentOrgId) {
    if (!modalVm) {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const vnode = createVNode(RequireOrgModal, {
        onCancel: () => {
          render(null, container)
          modalVm = null
        },
        onCreate: () => {
          render(null, container)
          modalVm = null
          router.push('/organizations')
        },
      })

      render(vnode, container)
      modalVm = vnode
    }
  }

  return true
})

