import { Button, Avatar, Menu, MenuItem, Fade, Chip } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getProfileAPI } from '@/api/user'
import { useStore } from '@/store'
import { getToken } from '@/utils'

export default function Profile() {
  const { username, avatar, setUsername, setAvatar, setUserId, clearUserInfo } =
    useStore()
  const navigate = useNavigate()
  const isLogin = getToken()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLogin) navigate('/login')
    setAnchorEl(event.currentTarget)
  }

  // 关闭
  const handleClose = () => {
    setAnchorEl(null)
  }

  // 退出账号
  const handleLogout = () => {
    clearUserInfo()
    navigate('/login')
  }

  // 跳转到个人信息页
  const handleToInformation = () => {
    navigate('/userinfo')
  }

  // 获取个人用户信息
  useEffect(() => {
    if (!isLogin) return

    getProfileAPI().then((res) => {
      setUsername(res.data.username)
      setUserId(res.data.id)
      setAvatar(res.data.avatar)
    })
  }, [setUserId, setUsername, avatar])

  return (
    <div>
      <Button
        id='fade-button'
        size='large'
        aria-controls='fade-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Chip
          avatar={<Avatar alt='Photo' src={avatar} />}
          label={isLogin ? username || 'Loading...' : '未登录'}
          variant='filled'
          color='primary'
        />
      </Button>

      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem
          onClick={() => {
            handleClose(), handleToInformation()
          }}>
          我的信息
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(), handleLogout()
          }}>
          登出
        </MenuItem>
      </Menu>
    </div>
  )
}
