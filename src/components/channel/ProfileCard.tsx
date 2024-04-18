import { NotificationsNone as NotificationsNoneIcon } from '@mui/icons-material'
import {
  Avatar,
  Typography,
  Button,
  CardMedia,
  Box,
  Skeleton,
} from '@mui/material'

import { Channel } from '@/types/user'

type ProfileCardProps = {
  loading: boolean
  user: Channel
  isSubscribed: boolean
  isMine: boolean
  onSubscribeClick: () => void
}

export default function ProfileCard({
  loading,
  user,
  isSubscribed,
  isMine,
  onSubscribeClick,
}: ProfileCardProps) {
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
      <Box className='mt-8 flex cursor-pointer items-center gap-8'>
        {loading ? (
          <Skeleton
            animation='wave'
            variant='circular'
            width={125}
            height={125}
          />
        ) : (
          <Avatar
            src={user.avatar || '/src/assets/avatar.png'}
            sx={{ width: 125, height: 125 }}
          />
        )}
        <Box className='w-[50%]'>
          <Typography variant='h4' fontWeight='bold'>
            {loading ? (
              <Skeleton
                animation='wave'
                height={20}
                width='40%'
                className='mb-1'
              />
            ) : (
              user.username
            )}
          </Typography>

          <Typography variant='subtitle1'>
            {loading ? (
              <Skeleton animation='wave' height={15} width='80%' />
            ) : (
              `${user.subscribersCount} 位订阅者 · ${user.videosCount} 个视频`
            )}
          </Typography>

          <Typography variant='body1'>
            {loading ? (
              <Skeleton animation='wave' height={15} width='80%' />
            ) : (
              user.channelDescription || '这个用户什么也没有留下'
            )}
          </Typography>

          {!isMine && (
            <>
              {loading ? (
                <Skeleton
                  animation='wave'
                  height={60}
                  width='30%'
                  className='mt-10 rounded-full'
                />
              ) : (
                <>
                  {isSubscribed ? (
                    <Button
                      onClick={onSubscribeClick}
                      sx={{
                        mt: 2,
                        borderRadius: 4,
                        px: 5,
                        bgcolor: '#BFBFBF',
                        color: 'black',
                      }}
                      startIcon={<NotificationsNoneIcon />}>
                      已订阅
                    </Button>
                  ) : (
                    <Button
                      onClick={onSubscribeClick}
                      sx={{ mt: 2, borderRadius: 4, px: 5 }}
                      variant='contained'
                      color='primary'>
                      订阅
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
