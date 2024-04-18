import { Container, Grid, Pagination } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { getUserVideosAPI } from '@/api/video'
import { VideoList, Loading, Empty } from '@/components'

export default function ChannelVideo() {
  const { userId } = useParams()
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const {
    data: videoList,
    isLoading,
    isFetching,
  } = useQuery(
    ['my-videos', pageNum, userId],
    async () => {
      const res = await getUserVideosAPI(userId, {
        pageNum: pageNum,
        pageSize: 8,
      })

      setPageCount(Math.ceil(res.data.videosCount / 8))

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
    setPageNum(value)
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
            page={pageNum}
            size='large'
            onChange={(_e, value) => onHandleChange(value)}
          />
        )}
      </Grid>
    </Container>
  )
}
