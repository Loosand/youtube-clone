import { request } from '@/utils'
import {
  type VideoModel,
  type CreateVideoRes,
  type VideoListRes,
} from '@/types/video'

// 创建视频
export const createVideoAPI = (data: {
  title: string
  description: string
  vodVideoId: string
}) => {
  return request<CreateVideoRes>({
    url: '/videos',
    method: 'POST',
    data,
  })
}

// 获取视频
export const getVideoAPI = (videoId: string) => {
  return request<VideoModel>({
    url: `/videos/${videoId}`,
    method: 'GET',
    params: { videoId },
  })
}

// 获取我的视频列表
export const getMyVideosAPI = (pageNum: number, pageSize: number = 8) => {
  return request<VideoListRes>({
    url: '/videos',
    method: 'GET',
    params: { pageNum, pageSize },
  })
}

// 获取我订阅的频道的视频列表
export const getSubVideosAPI = (pageNum: number, pageSize: number = 8) => {
  return request<VideoListRes>({
    url: '/user/videos/feed',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
    },
  })
}

// 根据用户获取视频列表
export const getUserVideosAPI = (
  userId: string,
  params: { pageNum: number; pageSize: 8 },
) => {
  return request<VideoListRes>({
    url: `/users/${userId}/videos`,
    method: 'GET',
    params,
  })
}

// 随机推荐视频
export const getRandomVideosAPI = () => {
  return request<VideoModel[]>({
    url: '/recommend',
    method: 'GET',
  })
}
