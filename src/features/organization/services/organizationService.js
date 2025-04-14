import axiosUser from '@/lib/axiosUser'

export const getOrganizations = () => {
  return axiosUser.get('/organizations', {})
}

export const createOrganization = (data) => {
  return axiosUser.post('/organizations', data)
}

export const updateOrganization = (id, data) => {
  return axiosUser.put(`/organizations/${id}`, data)
}

export const deleteOrganization = (id) => {
  return axiosUser.delete(`/organizations/${id}`)
}