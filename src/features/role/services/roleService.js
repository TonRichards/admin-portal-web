import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getRoles = (params) => {
  return axiosUser.get('/api/clients/roles', {
    ...params,
    application_id: applicationId,
  })
}

export const createRoleService = (params) => {
  return axiosUser.post('/api/clients/roles', {
    ...params,
    application_id: applicationId,
  })
}

export const updateRoleService = (id, params) => {
  return axiosUser.put(`/api/clients/roles/${id}`, {
    ...params,
    application_id: applicationId,
  })
}

export const deleteRoleService = (id) => {
  return axiosUser.delete(`/api/clients/roles/${id}`)
}
