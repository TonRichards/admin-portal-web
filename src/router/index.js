import { createRouter, createWebHistory } from 'vue-router'
import { useOrganizationStore } from '@/stores/organizationStore'
import RequireOrgModal from '@/components/RequireOrgModal.vue'
import RequireLoginModal from '@/components/RequireLoginModal.vue'
import { createVNode, render } from 'vue'

import LandingPage from '@/pages/landing/LandingPage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import DashboardPage from '@/pages/dashboard/DashboardPage.vue'
import OrdersPage from '@/pages/order/OrdersPage.vue'
import UsersPage from '@/pages/user/UsersPage.vue'
import UserCreatePage from '@/pages/user/UserCreatePage.vue'
import UserDetailPage from '@/pages/user/UserDetailPage.vue'
import RolesPage from '@/pages/role/RolesPage.vue'
import PermissionsPage from '@/pages/permission/PermissionsPage.vue'
import OrganizationsPage from '@/pages/organization/OrganizationsPage.vue'

import { checkAuth } from '@/lib/axiosUser'

const routes = [
  { path: '/', component: LandingPage, meta: { public: true }},
  { path: '/login', component: LoginPage, meta: { public: true }},
  { path: '/register', component: RegisterPage, meta: { public: true }},
  // Admin pages
  { path: '/dashboard', component: DashboardPage },
  { path: '/orders', component: OrdersPage },
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
  const isPublic = to.meta.public

  const orgStore = useOrganizationStore()
  const user = await checkAuth()

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

