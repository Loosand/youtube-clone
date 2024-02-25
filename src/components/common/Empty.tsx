import { Box } from '@mui/material'

export default function Empty({ children }) {
  return (
    <Box className='flex h-[50vh] items-center justify-center text-3xl font-semibold'>
      {children}
    </Box>
  )
}
