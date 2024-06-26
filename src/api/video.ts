import { VideoUserRes } from '@/types/user'
import {
  type VideoModel,
  type CreateVideoRes,
  type VideoListRes,
  AddCommentRes,
  CommentRes,
} from '@/types/video'
import { request } from '@/utils'

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
  return request<VideoModel & { user: VideoUserRes }>({
    url: `/videos/${videoId}`,
    method: 'GET',
    params: { videoId },
  })
}

// 删除视频
export const deleteVideoAPI = (videoId: string) => {
  return request({
    url: `/videos/${videoId}`,
    method: 'DELETE',
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

// 添加评论
export const addCommentAPI = (videoId: string, data: { content: string }) => {
  return request<AddCommentRes>({
    url: `/videos/${videoId}/comments`,
    method: 'POST',
    data,
  })
}

// 获取评论
export const getCommentAPI = (
  videoId: string,
  params: { pageNum?: number; pageSize?: 8 },
) => {
  return request<CommentRes[]>({
    url: `/videos/${videoId}/comments`,
    method: 'GET',
    params,
  })
}

// 删除评论
export const deleteCommentAPI = (videoId: string, commentId: string) => {
  return request({
    url: `/videos/${videoId}/comments/${commentId}`,
    method: 'DELETE',
  })
}

// 收藏视频
export const collectVideoAPI = (videoId: string) => {
  return request({
    url: `/videos/${videoId}/like`,
    method: 'POST',
  })
}

// 取消收藏视频
export const cancelCollectVideoAPI = (videoId: string) => {
  return request({
    url: `/videos/${videoId}/dislike`,
    method: 'POST',
  })
}

// 获取我收藏的视频列表
export const getCollectVideosAPI = (pageNum: number, pageSize: number = 8) => {
  return request<VideoListRes>({
    url: `/user/videos/liked`,
    method: 'GET',
    params: { pageNum, pageSize },
  })
}

// 获取用户收藏的视频列表
export const getUserCollectVideosAPI = (
  userId: string,
  params: { pageNum: number; pageSize: 8 },
) => {
  return request<VideoListRes>({
    url: `${userId}/liked`,
    method: 'GET',
    params,
  })
}
