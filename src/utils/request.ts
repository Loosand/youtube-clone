import axios, { AxiosError } from 'axios'

import { getToken, removeToken } from '@/utils/token'

export interface ResponseData<T> {
  code: number
  message: string
  data: T
  error?: string
}

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config)
      }, 800)
    })
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      removeToken() // 删除 token
      window.location.reload() // 强制刷新
    }

    return Promise.reject(error)
  },
)

export default request
