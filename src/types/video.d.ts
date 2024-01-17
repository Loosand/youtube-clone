import { type User } from './user'
import { User } from '../models/user'

export interface VideoRes {
  _id: string
  title: string
  description: string
  vodVideoId: string
  cover: string
  commentsCount: number
  dislikesCount: number
  likesCount: number
  viewsCount: number
  isLiked: boolean
  isDisliked: boolean
  createdAt: string
  updatedAt: string
  user: User
}

export interface CreateVideoRes {
  _id: string
  title: string
  description: string
  vodVideoId: string
  cover: string
  commentsCount: number
  dislikesCount: number
  likesCount: number
  viewsCount: number
  user: string
}

export interface VideoListRes {
  videos: VideoRes[]
  videosCount: number
}
