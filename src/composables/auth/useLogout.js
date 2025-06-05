import { useRouter } from 'vue-router'
import { logoutService } from '@/services/authService'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await logoutService({
        refresh_token: localStorage.getItem('refreshToken')
      })

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    logout
  }
}