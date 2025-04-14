import { reactive } from 'vue'

export function useUserForm() {
  const form = reactive({
    name: '',
    email: '',
    organization_roles: [], 
    roles: {},
  })

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.organization_roles = []
    form.roles = {}
  }

  const getPayload = () => {
    return {
      name: form.name,
      email: form.email,
      organizations: form.organization_roles.map((organization_id) => ({
        organization_id,
        role: form.roles[organization_id] || ''
      }))
    }
  }

  const isValid = () => {
    if (!form.name || !form.email || form.organization_roles.length === 0) return false
    return form.organization_roles.every((id) => form.roles[id] && form.roles[id] !== '')
  }

  return {
    form,
    resetForm,
    getPayload,
    isValid
  }
}
