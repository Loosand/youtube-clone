export type User = {
  _id: string
  username: string
  email: string
  avatar: string
  cover: string
  subscribersCount: number
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

export type UpdateProfileRes = LoginRes
