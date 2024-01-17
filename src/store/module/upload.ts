export const createUpload = (set: any) => ({
  uploadState: true,
  selectedFile: null,
  activeStep: 0,

  setStepNext: () =>
    set((state: any) => ({ activeStep: state.activeStep + 1 })),

  setStepBack: () =>
    set((state: any) => ({ activeStep: state.activeStep - 1 })),

  setUploadState: (bool: boolean) =>
    set((state: any) => ({ uploadState: (state.uploadState = bool) })),

  setSelectedFile: (file: File) => set({ selectedFile: file }),
})
