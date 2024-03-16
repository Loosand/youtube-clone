import { getToken, setToken as _setToken, removeToken } from '@/utils/token'

export const createUser = (set: any) => ({
  token: getToken || null,

  username: null,
  avatar: null,
  userId: null,

  setToken: (token: string) => (set({ token: token }), _setToken(token)),

  setUsername: (username: string) => {
    set({ username: username })
  },

  setAvatar: (avatar: string) => {
    set({ avatar: avatar })
  },

  setUserId: (userId: string) => {
    set({ userId: userId })
  },

  clearUserInfo: () => {
    set({ token: null, username: null, userId: null })
    removeToken()
  },
})
