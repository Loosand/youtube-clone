import React from 'react'

import { Avatar, Typography, Button, CardMedia, Box } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

export default function ProfileCard({
  // name = "Loosand",
  // fans = 100,
  // videos = 118,
  // avatar = "/src/assets/avatar.png",
  // desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum",
  // sub = false,
  user,
}) {
  return (
    <>
      <CardMedia
        sx={{
          borderRadius: 2,
          height: 160,
        }}
        component='img'
        alt='Header Background'
        image={user.cover || '/src/assets/avatar.png'}
      />
      <Box className='mt-8 flex items-center gap-8'>
        <Avatar
          sx={{ width: 125, height: 125 }}
          alt='User Avatar'
          src={user.avatar || '/src/assets/avatar.png'}
        />
        <Box>
          <Typography variant='h4' fontWeight='bold'>
            {user.username}
          </Typography>
          <Typography variant='subtitle1' component='span'>
            {user.subscribersCount}位订阅者 · {user.videosCount || 10}个视频
          </Typography>

          <Typography variant='body1'>
            {user.channelDescription || '这个用户什么也没有留下'}
          </Typography>
          {user.sub ? (
            <Button
              sx={{
                mt: 2,
                borderRadius: 4,
                px: 3,
                bgcolor: '#BFBFBF',
                color: 'black',
              }}
              startIcon={<NotificationsNoneIcon />}>
              已订阅
            </Button>
          ) : (
            <Button
              sx={{ mt: 2, borderRadius: 4, px: 3 }}
              variant='contained'
              color='primary'>
              订阅
            </Button>
          )}
        </Box>
      </Box>
    </>
  )
}
