import { useState } from 'react'
import { useQuery } from 'react-query'

import { getSubChannelsAPI, unsubscribeAPI, subscribeAPI } from '@/api/channel'
import { ChannelList, Loading, Empty } from '@/components'
import { useStore } from '@/store'

export default function SubChannel() {
  const { userId } = useStore()
  const [subscriptionStatus, setSubscriptionStatus] = useState({})

  const {
    data: subList,
    isLoading,
    isFetching,
  } = useQuery(
    ['sub-channel', userId],
    async () => {
      const res = await getSubChannelsAPI(userId)

      const initialSubscriptionStatus = {}

      subList?.map((item) => {
        initialSubscriptionStatus[item._id] = true
      })

      setSubscriptionStatus(initialSubscriptionStatus)

      return res.data
    },
    {
      keepPreviousData: true,
      enabled: !!userId,
    },
  )

  const handleUnSubscribeClick = (channelId: string) => {
    if (userId) {
      unsubscribeAPI(channelId).then(() => {
        setSubscriptionStatus((prevStatus) => ({
          ...prevStatus,
          [channelId]: false,
        }))
      })
    }
  }

  const handleSubscribeClick = (channelId: string) => {
    if (userId) {
      subscribeAPI(channelId).then(() => {
        setSubscriptionStatus((prevStatus) => ({
          ...prevStatus,
          [channelId]: true,
        }))
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (subList?.length === 0) {
    return <Empty>暂无关注的频道</Empty>
  }

  return (
    <ChannelList
      loading={isLoading || isFetching}
      subList={subList}
      subscriptionStatus={subscriptionStatus}
      onUnSubscribeClick={handleUnSubscribeClick}
      onSubscribeClick={handleSubscribeClick}
    />
  )
}
