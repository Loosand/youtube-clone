import { useState, useEffect } from 'react'
import { getSubVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import { Box, Grid, Pagination, Typography } from '@mui/material'
import Loading from '@/components/common/Loading'

export default function SubVideo() {
  const [videoList, setVideoList] = useState([])
  const [videoCount, setVideoCount] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)

  // 分页组件获取页数
  const onHandleChange = (value: number) => {
    setPage(value)
  }

  // 页面大小
  const pageSize = 12

  // 页面总数
  let pageCount: number
  videoCount ? (pageCount = Math.ceil(videoCount / pageSize)) : (pageCount = 1)

  // 视频列表请求
  useEffect(() => {
    getSubVideosAPI(page, pageSize)
      .then((res) => {
        setVideoList(res.data.videos)
        setVideoCount(res.data.videosCount)
        setLoading(false)
        setEmpty(res.data.videosCount === 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [page])

  return (
    <>
      <Box className='space-y-10'>
        <VideoList videos={videoList} />
        <Grid className='justify-center' container>
          {Boolean(videoList.length === 0) || (
            <Pagination
              count={pageCount}
              page={page}
              size='large'
              onChange={(_e, value) => onHandleChange(value)}
            />
          )}
        </Grid>{' '}
      </Box>

      {empty && <Typography variant='h5'>暂无订阅视频</Typography>}
      {loading && <Loading />}
    </>
  )
}
