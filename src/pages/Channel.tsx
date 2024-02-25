import { Outlet } from 'react-router-dom'
import ProfileCard from '@/components/channel/ProfileCard'
import { Box } from '@mui/material'
import NavBar from '@/components/channel/NavBar'
import { getChannelInfoAPI } from '@/api/channel'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Loading from '@/components/common/Loading'
import { useStore } from '@/store'

export default function Channel() {
  const { userId } = useParams()
  const { userId: myUserId } = useStore()
  const isMine = userId === myUserId

  const menu = ['', 'video', 'dynamic']

  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery(
    'channel-list',
    async () => {
      const res = await getChannelInfoAPI(userId)
      return res.data
    },
    {
      keepPreviousData: false,
    },
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box className='pb-20'>
      <Box className='p-4'>
        <ProfileCard
          loading={isFetching || isLoading}
          isMine={isMine}
          user={user}
        />
        <NavBar menu={menu} />
      </Box>
      <Outlet />
    </Box>
  )
}
