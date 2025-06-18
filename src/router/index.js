import { createRouter, createWebHistory } from 'vue-router'
import { useOrganizationStore } from '@/stores/organizationStore'
import RequireOrgModal from '@/components/RequireOrgModal.vue'
import RequireLoginModal from '@/components/RequireLoginModal.vue'
import { createVNode, render } from 'vue'
import { useAuthStore } from '@/stores/authStore'

import LandingPage from '@/views/landing/LandingPage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import DashboardPage from '@/views/dashboard/DashboardPage.vue'
import OrdersPage from '@/views/order/OrdersPage.vue'
import InventoriesPage from '@/views/inventory/InventoriesPage.vue'
import UsersPage from '@/views/user/UsersPage.vue'
import UserCreatePage from '@/views/user/UserCreatePage.vue'
import UserDetailPage from '@/views/user/UserDetailPage.vue'
import RolesPage from '@/views/role/RolesPage.vue'
import PermissionsPage from '@/views/permission/PermissionsPage.vue'
import OrganizationsPage from '@/views/organization/OrganizationsPage.vue'

const routes = [
  { path: '/', component: LandingPage, meta: { public: true } },
  { path: '/login', component: LoginPage, meta: { public: true } },
  { path: '/register', component: RegisterPage, meta: { public: true } },
  // Admin pages
  { path: '/dashboard', component: DashboardPage },
  { path: '/orders', component: OrdersPage },
  { path: '/inventories', component: InventoriesPage },
  // Admin settings
  { path: '/users', component: UsersPage },
  { path: '/users/create', component: UserCreatePage },
  { path: '/users/:id', component: UserDetailPage },
  { path: '/roles', component: RolesPage },
  { path: '/permissions', component: PermissionsPage },
  { path: '/organizations', component: OrganizationsPage, meta: { public: true } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

let modalVm = null

router.beforeEach(async (to, from) => {
  const isPublic = to.meta.public

  const auth = useAuthStore()

  auth.loadUser()
  auth.loadTokens()

  if (!auth.accessToken) {
    await auth.refreshTokenIfNeeded()
  }

  const user = auth.user
  const orgStore = useOrganizationStore()

  if (!user && !isPublic) {
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

  if (user) {
    await orgStore.init()

    if (!orgStore.currentOrgId && !isPublic) {
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
  }

  return true
})
