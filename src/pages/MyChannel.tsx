import { Outlet } from 'react-router-dom'
import ProfileCard from '@/components/channel/ProfileCard'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import NavBar from '@/components/channel/NavBar'
import { getProfileAPI } from '@/api/user'

export default function MyChannel() {
  const [user, setUser] = useState({})
  const menu = ['/home', '/home/video', '/home/dynamic']

  useEffect(() => {
    getProfileAPI().then((res) => {
      setUser(res.data)
    })
  }, [])

  return (
    <Box className='min-h-[85vh] bg-gray-200 pb-20'>
      <Box className='p-4'>
        <ProfileCard user={user} />
        <NavBar menu={menu} />
      </Box>
      <Outlet />
    </Box>
  )
}
