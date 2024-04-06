import { Container, Grid, Pagination } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getUserVideosAPI } from '@/api/video'
import { VideoList, Loading, Empty } from '@/components'

export default function ChannelVideo() {
  const [videoCount, setVideoCount] = useState(null)
  const [page, setPage] = useState(1)
  const { userId } = useParams()
  const pageSize = 8
  let pageCount: number
  videoCount ? (pageCount = Math.ceil(videoCount / pageSize)) : (pageCount = 1)

  const {
    data: videoList,
    isLoading,
    isFetching,
  } = useQuery(
    ['my-videos', page, userId],
    async () => {
      const res = await getUserVideosAPI(userId, {
        pageNum: page,
        pageSize,
      })

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
    return <Loading height='30vh' />
  }

  if (videoList?.length === 0) {
    return <Empty>暂无视频</Empty>
  }

  return (
    <Container maxWidth='xl' className='mb-10 space-y-10'>
      <VideoList loading={isLoading || isFetching} videos={videoList} />

      <Grid className='justify-center' container>
        {Boolean(videoList.length === 0) || (
          <Pagination
            count={pageCount}
            page={page}
            size='large'
            onChange={(_e, value) => onHandleChange(value)}
          />
        )}
      </Grid>
    </Container>
  )
}
