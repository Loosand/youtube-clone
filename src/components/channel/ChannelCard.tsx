import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'

const ChannelCard = ({
  avatar = '/avatar.png',
  username = '匿名',
  channelDescription = '这个用户什么也没留下',
  isSubscribed = true,
  onUnSubscribeClick,
  onSubscribeClick,
  id,
}) => {
  const navigate = useNavigate()
  const handleGoVideoDetail = () => {
    navigate(`/${id}`)
  }

  const [open, setOpen] = useState(false)

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
            <Avatar alt={username} src={avatar} />
            <Box className='w-48'>
              <Typography
                className='overflow-hidden text-ellipsis whitespace-nowrap'
                variant='h5'>
                {username}
              </Typography>
              <Typography
                className='overflow-hidden text-ellipsis whitespace-nowrap'
                variant='body2'>
                {channelDescription}
              </Typography>
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

      <Dialog open={open} onClose={handleCancelUnsubscribe}>
        <DialogTitle>确认取消订阅</DialogTitle>
        <DialogContent>
          <DialogContentText>确定要取消订阅吗？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUnsubscribe}>取消</Button>
          <Button onClick={handleConfirmUnsubscribe}>确定</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ChannelCard
