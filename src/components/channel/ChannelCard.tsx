import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Skeleton,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CusDialog from '../common/CusDialog'

import { User } from '@/types/user'

type ChannelCardProps = {
  loading: boolean
  user: User
  isSubscribed: boolean
  onUnSubscribeClick: () => void
  onSubscribeClick: () => void
}

export default function ChannelCard({
  loading,
  user,
  isSubscribed = true,
  onUnSubscribeClick,
  onSubscribeClick,
}: ChannelCardProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleGoVideoDetail = () => {
    navigate(`/${user._id}?isSubscribed=${isSubscribed}`)
  }

  const handleSubscribeClick = (e) => {
    e.stopPropagation()

    onSubscribeClick()
  }

  const handleUnSubscribeClick = (e) => {
    e.stopPropagation()

    if (isSubscribed) {
      setOpen(true)
    }
  }

  const handleConfirmUnsubscribe = (e) => {
    e.stopPropagation()

    onUnSubscribeClick()
    setOpen(false)
  }

  const handleCancelUnsubscribe = (e) => {
    e.stopPropagation()

    setOpen(false)
  }

  return (
    <Box className='cursor-pointer'>
      <Card
        className='transition-colors duration-300 hover:bg-slate-300 active:bg-slate-400'
        sx={{ bgcolor: '#e2e8f0' }}
        onClick={handleGoVideoDetail}>
        <CardContent className='flex items-center justify-between'>
          <Box className='flex shrink items-center gap-4'>
            {loading ? (
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
            ) : (
              <Avatar alt={user.username} src={user.avatar} />
            )}
            <Box className='w-48'>
              {loading ? (
                <Skeleton
                  animation='wave'
                  height={10}
                  width='60%'
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <Typography
                  className='overflow-hidden text-ellipsis whitespace-nowrap'
                  variant='h5'>
                  {user.username}
                </Typography>
              )}

              {loading ? (
                <Skeleton
                  animation='wave'
                  height={10}
                  width='100%'
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <Typography
                  className='overflow-hidden text-ellipsis whitespace-nowrap'
                  variant='body2'>
                  {user.channelDescription || '这个用户什么也没有留下'}
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            className='whitespace-nowrap'
            variant={isSubscribed ? 'outlined' : 'contained'}
            color='primary'
            onClick={
              isSubscribed ? handleUnSubscribeClick : handleSubscribeClick
            }>
            {isSubscribed ? '已订阅' : '订阅'}
          </Button>
        </CardContent>
      </Card>

      <CusDialog
        title='确认取消订阅'
        content='确定要取消订阅该频道吗？'
        open={open}
        onClose={handleCancelUnsubscribe}
        onConfirm={handleConfirmUnsubscribe}
      />
    </Box>
  )
}
