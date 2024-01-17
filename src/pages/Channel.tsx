import { Outlet } from 'react-router-dom'
import ProfileCard from '@/components/channel/ProfileCard'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import NavBar from '@/components/channel/NavBar'
import { getChannelInfoAPI } from '@/api/channel'
import { useParams } from 'react-router-dom'

export default function Channel() {
  const { userId } = useParams()

  const [user, setUser] = useState({})
  const menu = ['', 'video', 'dynamic']

  useEffect(() => {
    getChannelInfoAPI(userId).then((res) => {
      setUser(res.data)
    })
  }, [])

  return (
    <Box className='bg-gray-200 pb-20'>
      <Box className='p-4'>
        <ProfileCard user={user} />
        <NavBar menu={menu} />
      </Box>
      <Outlet />
    </Box>
  )
}
