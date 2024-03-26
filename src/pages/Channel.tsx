import { Box } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Outlet, useParams } from 'react-router-dom'

import { getChannelInfoAPI, subscribeAPI, unsubscribeAPI } from '@/api/channel'
import { NavBar, Loading, ProfileCard } from '@/components'
import useCheckIsSelf from '@/hooks/useCheckIsSelf'

const MENU = ['', 'dynamic']

export default function Channel() {
  const { userId } = useParams()
  const isMine = useCheckIsSelf(userId)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const {
    data: channel,
    isLoading,
    isFetching,
  } = useQuery(
    [isSubscribed],
    async () => {
      const res = await getChannelInfoAPI(userId)
      return res.data
    },
    {
      keepPreviousData: false,
    },
  )

  const handleSubscribeClick = () => {
    if (channel.isSubscribed) {
      unsubscribeAPI(userId).then((res) => {
        if (Number(res.code) === 200) {
          setIsSubscribed(false)
        }
      })
      return
    } else {
      subscribeAPI(userId).then((res) => {
        if (Number(res.code) === 200) {
          setIsSubscribed(true)
        }
      })
      return
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box className='pb-20'>
      <Box className='p-4'>
        <ProfileCard
          isSubscribed={isSubscribed}
          onSubscribeClick={handleSubscribeClick}
          loading={isFetching || isLoading}
          isMine={isMine}
          user={channel}
        />
        <NavBar menu={MENU} />
      </Box>
      <Outlet />
    </Box>
  )
}
