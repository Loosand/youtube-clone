import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createLogin } from './module/login'
import { createToast } from './module/toast'
import { createUpload } from './module/upload'
import { createUser } from './module/user'

export const useStore = create(
  devtools((set) => ({
    ...createUser(set),
    ...createLogin(set),
    ...createToast(set),
    ...createUpload(set),
  })),
)
