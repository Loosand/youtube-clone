export const createLogin = (set: any) => ({
  email: '',
  password: '',

  setEmail: (email: string) => set({ email: email }),
  setPassword: (password: string) => set({ password: password }),
})
