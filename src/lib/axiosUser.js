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

export const checkAuth = async () => {
  const auth = useAuthStore()
  auth.loadTokens()

  if (!auth.accessToken) {
    const ok = await auth.refreshTokenIfNeeded()
    if (!ok) return null
  }

  const token = auth.accessToken
  const payload = JSON.parse(atob(token.split('.')[1]))
  auth.setUser({
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    current_organization_id: payload.current_organization_id,
  })

  return auth.user
}

export default instance
