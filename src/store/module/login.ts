export const createLogin = (set) => ({
  email: 'loosand@163.com',
  password: '196475',

  setEmail: (email: string) => set({ email: email }),
  setPassword: (password: string) => set({ password: password }),
})
