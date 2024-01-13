export interface User {
  username: string
  email: string
  password: string
  avatar?: null | string
  cover?: null | string
  channelDescription?: null | string
  subscribersCount?: number
  createAt?: Date
  updateAt?: Date
}
