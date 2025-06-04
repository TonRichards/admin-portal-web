import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getRoles = (data) => {
  return axiosUser.get('/api/roles', {
    params: {
      ...data,
      application_id: applicationId,
    },
  });
}

export const createRoleService = (params) => {
  return axiosUser.post('/api/roles', {
    ...params,
    application_id: applicationId,
  })
}

export const updateRoleService = (id, params) => {
  return axiosUser.put(`/api/roles/${id}`, {
    ...params,
    application_id: applicationId,
  })
}

export const deleteRoleService = (id) => {
  return axiosUser.delete(`/api/roles/${id}`)
}
