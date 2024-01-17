import ChannelList from '@/components/channel/ChannelList'
import { type ChannelRes } from '@/types/channel'
import { getSubChannelsAPI, unsubscribeAPI, subscribeAPI } from '@/api/channel'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'

export default function SubChannel() {
  const { userId } = useStore()
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)
  const [subList, setSubList] = useState<ChannelRes[]>()
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>({})

  useEffect(() => {
    if (userId) {
      getSubChannelsAPI(userId).then((res) => {
        setSubList(res.data)
        setLoading(false)

        setEmpty(res.data.length === 0)

        const initialSubscriptionStatus = {}

        subList?.map((item) => {
          initialSubscriptionStatus[item._id] = true
        })

        setSubscriptionStatus(initialSubscriptionStatus)
      })
    }
  }, [userId])

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

  return (
    <>
      <ChannelList
        subList={subList}
        subscriptionStatus={subscriptionStatus}
        onUnSubscribeClick={handleUnSubscribeClick}
        onSubscribeClick={handleSubscribeClick}
      />

      {empty && <Empty>暂无关注的频道</Empty>}
      {loading && <Loading />}
    </>
  )
}
