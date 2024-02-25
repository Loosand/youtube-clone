import VideoCard from '@/components/video/VideoCard'
import { Grid } from '@mui/material'

export default function VideoList({
  loading,
  videos,
}: {
  loading?: boolean
  videos: any
}) {
  return (
    <Grid container spacing={3}>
      {videos?.map((item: any) => (
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
