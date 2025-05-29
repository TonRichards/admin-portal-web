import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getOrganizations = () => {
  return axiosUser.get('/api/clients/organizations', {})
}

export const createOrganization = (data) => {
  return axiosUser.post('/api/clients/organizations', {
    ...data,
    application_id: applicationId,
  })
}

export const updateOrganization = (id, data) => {
  return axiosUser.put(`/api/clients/organizations/${id}`, {
    ...data,
    application_id: applicationId,
  })
}

export const deleteOrganization = (id) => {
  return axiosUser.delete(`/api/clients/organizations/${id}`)
}