import { useRouter } from 'vue-router'
import { logoutService } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
import { useOrganizationStore } from '@/stores/organizationStore'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await logoutService({
        refresh_token: localStorage.getItem('refreshToken'),
      })

      const auth = useAuthStore()
      auth.loadTokens()
      auth.clearTokens()

      auth.loadUser()
      auth.clearUser()

      const organizationStore = useOrganizationStore()

      organizationStore.reset()

      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    logout,
  }
}
