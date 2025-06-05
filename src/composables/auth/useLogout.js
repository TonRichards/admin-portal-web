import { useRouter } from 'vue-router'
import { login } from '@/services/authService'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await logout({
        refresh_token: localStorage.removeItem('token')
      })

      localStorage.removeItem('token')
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