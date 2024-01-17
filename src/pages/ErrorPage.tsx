import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Container from '@mui/material/Container'
import router from '@/router'
import { Typography } from '@mui/material'

// TODO 美化 404 页面
export default function PageNotFound() {
  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        <Box className='flex h-screen flex-col items-center  justify-center'>
          <Box className='items-center text-4xl'>
            <span>404</span>
            <span className='text-xl'> Not Found</span>
          </Box>

          <Button onClick={() => router.navigate('/')} variant='contained'>
            返回首页
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  )
}
