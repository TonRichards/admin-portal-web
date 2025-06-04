import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const checkAuth = async () => {
  try {
    const res = await instance.get('/api/auth/check')
    return res.data?.data || null
  } catch (err) {
    // ถ้า status = 401 หรือ error ใด ๆ ให้ถือว่ายังไม่ login
    return null
  }
}

export default instance
