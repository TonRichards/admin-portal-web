import { defineStore } from 'pinia'
import axiosUser from '@/lib/axiosUser'

export const useOrganizationStore = defineStore('org', {
  state: () => ({
    list: [],
    currentOrgId: null,
    triedInit: false,
  }),

  getters: {
    hasAny: (state) => state.list.length > 0,
    currentOrg: (state) =>
      state.list.find((o) => o.current_organization_id === state.currentOrgId) || null,
  },

  actions: {
    async init() {
      if (this.triedInit) return
      this.triedInit = true

      const res = await axiosUser.get('/api/auth/check')
      const user = res.data.data

      this.list = user.organizations || []

      if (user.current_organization_id) {
        this.currentOrgId = user.current_organization_id
      }
    },
    async switchOrganization(newOrgId) {
      try {
        await axiosUser.post('/api/auth/switch-organization', {
          organization_id: newOrgId,
        })
        this.currentOrgId = newOrgId
        window.location.reload()
      } catch (error) {
        console.error('Switch organization failed', error)
      }
    },

    setCurrent(id) {
      this.currentOrgId = id
    },
  },
})
