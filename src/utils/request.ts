import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken() // 删除 token
      window.location.reload() // 强制刷新
    }

    return Promise.reject(error)
  },
)

export default request
