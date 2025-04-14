import axiosUser from '@/lib/axiosUser'

export const getUsers = (params) => {
  return axiosUser.get('/users', { params })
}

export const getUserById = (id) => {
  return axiosUser.get(`/users/${id}`)
}

export const createUser = (data) => {
  return axiosUser.post('/users', data)
}

export const updateUser = (id, data) => {
  return axiosUser.put(`/users/${id}`, data)
}

export const deleteUser = (id) => {
  return axiosUser.delete(`/users/${id}`)
}