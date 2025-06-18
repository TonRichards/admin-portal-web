import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use(async (config) => {
  const auth = useAuthStore()
  auth.loadTokens()

  if (!auth.accessToken) {
    await auth.refreshTokenIfNeeded()
  }

  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }

  return config
})

export default instance
