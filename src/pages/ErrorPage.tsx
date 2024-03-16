import { Container, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navigate = useNavigate()

  return (
    <Container maxWidth='sm'>
      <Box className='flex h-screen flex-col items-center  justify-center'>
        <Box className='items-center text-4xl'>
          <span>404</span>
          <span className='text-xl'> Not Found</span>
        </Box>

        <Button onClick={() => navigate('/')} variant='contained'>
          返回首页
        </Button>
      </Box>
    </Container>
  )
}
