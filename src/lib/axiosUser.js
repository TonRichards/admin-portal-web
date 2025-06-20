import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { jwtDecode } from 'jwt-decode'

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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await instance.post('/api/auth/refresh', {
          refresh_token: auth.refreshToken,
        })

        const data = res.data.data

        const decoded = jwtDecode(data.access_token)

        const user = {
          ...data.user,
          current_organization_id: decoded.current_organization_id,
          current_organization_name: decoded.current_organization_name,
          organizations: decoded.organizations,
        }

        auth.setTokens(data.access_token, data.refresh_token)
        auth.setUser(user)

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return instance(originalRequest)
      } catch (refreshError) {
        auth.clearTokens()
        auth.clearUser()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default instance
