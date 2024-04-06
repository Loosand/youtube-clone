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
    params: {
      VideoId: videoId,
    },
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

export function uploadPicAPI(formData: FormData) {
  return request({
    url: '/vod/uploadPic',
    method: 'POST',
    data: formData,
  })
}
