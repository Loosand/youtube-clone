export const createUpload = (set) => ({
  uploadState: false,
  selectedFile: null,
  activeStep: 0,

  setStepNext: () => set((state) => ({ activeStep: state.activeStep + 1 })),

  setStepBack: () => set((state) => ({ activeStep: state.activeStep - 1 })),

  setUploadState: (bool: boolean) =>
    set((state) => ({ uploadState: (state.uploadState = bool) })),

  setSelectedFile: (file: File) => set({ selectedFile: file }),
})
