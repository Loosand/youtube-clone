import { request } from '@/utils'

interface CreateUploadVideoParams {
  Title: string
  FileName: string
}

export function createUploadVideoAPI(params: CreateUploadVideoParams) {
  return request({
    url: '/vod/createUploadVideo',
    method: 'GET',
    params,
  })
}

export function refreshUploadVideoAPI(videoId: string) {
  return request({
    url: '/vod/refreshUploadVideo',
    method: 'GET',
    params: videoId,
  })
}

export function getVideoPlayAuthAPI(vodVideoId: string) {
  return request({
    url: '/vod/getVideoPlayAuth',
    method: 'GET',
    params: {
      VideoId: vodVideoId,
    },
  })
}

export function createUploadImage(formData: FormData) {
  return request({
    url: '/vod/createUploadImage',
    method: 'POST',
    data: formData,
  })
}
