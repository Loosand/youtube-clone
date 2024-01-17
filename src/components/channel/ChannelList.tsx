import ChannelCard from '@/components/channel/ChannelCard'
import { Box } from '@mui/material'
import { type ChannelRes } from '@/types/channel'

type ChannelListProps = {
  subList: ChannelRes[]
  subscriptionStatus: boolean
  onUnSubscribeClick: (channelId: string) => void
  onSubscribeClick: (channelId: string) => void
}

export default function ChannelList({
  subList,
  subscriptionStatus,
  onUnSubscribeClick,
  onSubscribeClick,
}: ChannelListProps) {
  return (
    <Box className='space-y-4'>
      {subList?.map((item) => {
        return (
          <ChannelCard
            id={item._id}
            avatar={item.avatar}
            username={item.username}
            channelDescription={item.channelDescription}
            isSubscribed={subscriptionStatus[item._id]}
            key={item._id}
            onUnSubscribeClick={onUnSubscribeClick}
            onSubscribeClick={onSubscribeClick}
          />
        )
      })}
    </Box>
  )
}
