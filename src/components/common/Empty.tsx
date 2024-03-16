import { Box } from '@mui/material'

type EmptyProps = {
  children: React.ReactNode
}

export default function Empty({ children }: EmptyProps) {
  return (
    <Box className='flex h-[50vh] items-center justify-center text-3xl font-semibold'>
      {children}
    </Box>
  )
}
