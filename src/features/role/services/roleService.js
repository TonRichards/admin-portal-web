import axiosUser from '@/lib/axiosUser'

export const getRoles = (params) => {
  return axiosUser.get('/roles', { params })
}
