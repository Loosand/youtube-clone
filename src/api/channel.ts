import { ChannelRes } from '@/types/channel'
import { request } from '@/utils'

// 订阅
export function subscribeAPI(userId: string) {
  return request<ChannelRes>({
    url: `/users/${userId}/subscribe`,
    method: 'POST',
  })
}

// 取消订阅
export function unsubscribeAPI(userId: string) {
  return request<ChannelRes>({
    url: `/users/${userId}/subscribe`,
    method: 'DELETE',
  })
}

// 获取频道信息
export function getChannelInfoAPI(userId: string) {
  return request<ChannelRes>({
    url: `/users/${userId}`,
    method: 'GET',
  })
}

// 获取订阅频道列表
export function getSubChannelsAPI(userId: string) {
  return request<ChannelRes[]>({
    url: `/user/${userId}/subscriptions`,
    method: 'GET',
  })
}
