export type VideoUserRes = {
  _id: string
  username: string
  avatar: string
  subscribersCount: number
  isSubscribed: boolean
}

export type User = VideoUserRes & {
  email: string
  cover: string
  channelDescription: string
}

export type LoginRes = {
  username: string
  email: string
  avatar: string
  channelDescription: string
  token: string
}

export type RegisterRes = LoginRes

export type ProfileRes = LoginRes & {
  id: string
  password: string
  subscribersCount: number
}

export type UpdateProfileRes = LoginRes & {
  id: string
  subscribeCount: number
}

export type Channel = {
  username: string
  email: string
  avatar: string
  cover: string
  channelDescription: string
  subscribersCount: number
  isSubscribed: boolean
  videosCount: number
}
