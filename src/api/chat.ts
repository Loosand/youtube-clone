import { request } from '@/utils'

// 订阅
export function getMessageAPI(data: { from: string; to: string }) {
  return request<{ fromSelf: boolean; message: string }>({
    url: `/messages/get`,
    method: 'POST',
    data,
  })
}

export function sendMessageAPI(data: {
  from: string
  message: string
  to: string
}) {
  return request({
    url: `/messages/add`,
    method: 'POST',
    data,
  })
}
