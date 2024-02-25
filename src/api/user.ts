import { request } from '@/utils'
import {
  type ProfileRes,
  type RegisterRes,
  type UpdateProfileRes,
  type LoginRes,
} from '@/types/user'

// 登录
export function loginAPI(data: { email: string; password: string }) {
  return request<LoginRes>({
    url: '/users/login',
    method: 'POST',
    data,
  })
}

// 注册
export function registerAPI(data: {
  username: string
  email: string
  password: string
}) {
  return request<RegisterRes>({
    url: '/users',
    method: 'POST',
    data,
  })
}

// 获取我的信息
export function getProfileAPI() {
  return request<ProfileRes>({
    url: '/user',
    method: 'GET',
  })
}

// 修改用户信息
export function updateProfileAPI(data: {
  email: string
  username: string
  password: string
  avatar?: string
  channelDescription: string
}) {
  return request<UpdateProfileRes>({
    url: '/user',
    method: 'PATCH',
    data,
  })
}
