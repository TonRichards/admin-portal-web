import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getUsers = (params) => {
  return axiosUser.get('/api/users', { params })
}

export const getUser = (id) => {
  return axiosUser.get(`/api/users/${id}`)
}

export const createUser = (params) => {
  return axiosUser.post('/api/users', {
    ...params,
    application_id: applicationId,
  })
}

export const updateUser = (id, params) => {
  return axiosUser.put(`/api/users/${id}`, params)
}

export const deleteUser = (id) => {
  return axiosUser.delete(`/api/users/${id}`)
}