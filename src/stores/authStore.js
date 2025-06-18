import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    user: null,
  }),

  actions: {
    setTokens(access, refresh) {
      this.accessToken = access
      this.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    },

    loadTokens() {
      this.accessToken = localStorage.getItem('accessToken') || ''
      this.refreshToken = localStorage.getItem('refreshToken') || ''
    },

    clearTokens() {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    loadUser() {
      const userStr = localStorage.getItem('user')
      this.user = userStr ? JSON.parse(userStr) : null
    },

    async refreshTokenIfNeeded() {
      if (!this.refreshToken) return false

      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: this.refreshToken,
          }),
        })

        if (!res.ok) throw new Error('Refresh failed')

        const data = await res.json()
        this.setTokens(data.access_token, data.refresh_token)
        this.setUser(data.user)
        return true
      } catch (err) {
        console.error('Refresh token failed', err)
        this.clearTokens()
        return false
      }
    },
  },
})
