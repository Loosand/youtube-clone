import { Alert, Snackbar } from '@mui/material'

import { useStore } from '@/store'

const Toast = () => {
  const { message, type, open, setOpen } = useStore()

  const handleCloseSnackbar = () => {
    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      key={message}>
      <Alert onClose={handleCloseSnackbar} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
