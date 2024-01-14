import { devtools } from 'zustand/middleware'
import { create } from 'zustand'
import { createUser } from './module/user'
import { createToast } from './module/toast'
import { createLogin } from './module/login'


export const useStore = create(
  devtools((set) => ({
    ...createUser(set),
    ...createLogin(set),
    ...createToast(set),
  })),
)
