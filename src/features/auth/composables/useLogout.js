import axios from '@/lib/axiosUser'
import { useRouter } from 'vue-router'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    try {
      await axios.post('/api/clients/auth/logout')

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    logout
  }
}