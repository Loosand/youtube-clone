import { Box } from '@mui/material'

import ChannelCard from '@/components/channel/ChannelCard'
import { type ChannelRes } from '@/types/channel'

type ChannelListProps = {
  loading?: boolean
  subList: ChannelRes[]
  subscriptionStatus: Record<string, boolean>
  onUnSubscribeClick: (channelId: string) => void
  onSubscribeClick: (channelId: string) => void
}

export default function ChannelList({
  loading = false,
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
            loading={loading}
            user={item}
            isSubscribed={subscriptionStatus[item._id]}
            key={item._id}
            onUnSubscribeClick={() => onUnSubscribeClick(item._id)}
            onSubscribeClick={() => onSubscribeClick(item._id)}
          />
        )
      })}
    </Box>
  )
}
