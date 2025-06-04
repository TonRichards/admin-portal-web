import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const getPermissions = (data) => {
  return axiosUser.get('/api/permissions', {
    params: {
      ...data,
    },
  });
}
