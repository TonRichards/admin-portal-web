import axiosUser from '@/lib/axiosUser'

const applicationId = import.meta.env.VITE_APPLICATION_ID

export const roleSelectOptions = () => {
  return axiosUser.get('/api/select/option/roles', {
    application_id: applicationId,
  })
}

export const organizationSelectOptions = () => {
  return axiosUser.get(`/api/select/option/organizations`)
}

export const permissionSelectOptions = () => {
  return axiosUser.get(`/api/select/option/permissions`)
}

export const userSelectOptions = ({ params }) => {
  return axiosUser.get(`/api/select/option/users`, {
    params: {
      ...params,
    },
  })
}

