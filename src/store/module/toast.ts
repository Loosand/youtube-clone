type Category = 'error' | 'info' | 'success' | 'warning'

export const createToast = (set: any) => ({
  open: false,
  message: '',
  type: 'info' as Category,

  setOpen: (open: boolean) => set({ open }),

  setToast: (message: string, type: Category) => {
    set({ open: true, message, type })
  },
})
