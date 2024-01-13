import { type User } from '@/models/user'

type ResType<T> = {
  code: number
  msg: string
  data: T
}

type UserResType = ResType<User>
