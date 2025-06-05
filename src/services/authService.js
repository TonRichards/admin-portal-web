import axiosUser from '@/lib/axiosUser'

export const login = (params) => {
    return axiosUser.post('/api/auth/login', {
        ...params
    })
}

export const register = (params) => {
    return axiosUser.post('/api/auth/register', {
        ...params
    })
}

export const logout = (params) => {
    return axiosUser.port('/api/auth/logout', {
        ...params
    })
}
