import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getUsers = (params) => {
  return axiosUser.get('/users', { params })
}

export const getUser = (id) => {
  return axiosUser.get(`/users/${id}`)
}

export const createUser = (params) => {
  return axiosUser.post('/users', {
    ...params,
    application_id: applicationId,
  })
}

export const updateUser = (id, params) => {
  return axiosUser.put(`/users/${id}`, params)
}

export const deleteUser = (id) => {
  return axiosUser.delete(`/users/${id}`)
}