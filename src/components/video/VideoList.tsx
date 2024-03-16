import { Grid } from '@mui/material'

import VideoCard from '@/components/video/VideoCard'
import { type VideoModel } from '@/types/video'

type VideoListProps = {
  loading?: boolean
  videos: VideoModel[]
}

export default function VideoList({ loading, videos }: VideoListProps) {
  return (
    <Grid container spacing={3}>
      {videos?.map((item: VideoModel) => (
        <VideoCard
          loading={loading}
          img={item.cover}
          key={item._id}
          id={item._id}
          title={item.title}
          auth={item.user.username}
          desc={item.description}
          date={item.updatedAt}
        />
      ))}
    </Grid>
  )
}
