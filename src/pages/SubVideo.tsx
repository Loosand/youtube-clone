import { useState } from 'react'
import { getSubVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import { Box, Grid, Pagination, Typography } from '@mui/material'
import Loading from '@/components/common/Loading'
import { useQuery } from 'react-query'

export default function SubVideo() {
  const [videoCount, setVideoCount] = useState(null)
  const [page, setPage] = useState(1)
  const pageSize = 12
  let pageCount: number
  videoCount ? (pageCount = Math.ceil(videoCount / pageSize)) : (pageCount = 1)

  const {
    data: videoList,
    isFetching,
    isLoading,
  } = useQuery(
    ['sub-videos', page],
    async () => {
      const res = await getSubVideosAPI(page, pageSize)
      setVideoCount(res.data.videosCount)

      return res.data.videos
    },
    {
      keepPreviousData: true,
      onError: (error) => {
        console.error(error)
      },
    },
  )

  const onHandleChange = (value: number) => {
    setPage(value)
  }

  if (isLoading) {
    return <Loading />
  }

  if (videoList?.length === 0) {
    return <Typography variant='h5'>暂无订阅视频</Typography>
  }

  return (
    <Box className='space-y-10'>
      <VideoList loading={isFetching || isLoading} videos={videoList} />
      <Grid className='justify-center' container>
        {!isLoading && (
          <Pagination
            count={pageCount}
            page={page}
            size='large'
            onChange={(_e, value) => onHandleChange(value)}
          />
        )}
      </Grid>
    </Box>
  )
}
