export interface User {
  _id: string
  username: string
  email: string
  avatar: string
  cover: string
  subscribersCount: number
  channelDescription: string
}

export interface LoginRes {
  username: string
  email: string
  avatar: string
  channelDescription: string
  token: string
}

export interface RegisterRes extends LoginRes {}

export interface ProfileRes extends LoginRes {
  id: string
  password: string
  subscribersCount: number
}

export interface UpdateProfileRes extends LoginRes {}
