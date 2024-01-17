import React, { useState, useEffect } from 'react'
import { getMyVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import { Container, Grid, Pagination } from '@mui/material'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'

export default function MyChannelVideo() {
  const [videoList, setVideoList] = useState([])
  const [videoCount, setVideoCOunt] = useState(null)
  const [page, setPage] = useState(1) // 当前页面
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)

  // 分页组件获取页数
  const onHandleChange = (value: number) => {
    setPage(value)
  }

  // 页面大小
  const pageSize = 8

  // 页面总数
  let pageCount
  videoCount ? (pageCount = Math.ceil(videoCount / pageSize)) : (pageCount = 1)

  // 视频列表请求
  useEffect(() => {
    getMyVideosAPI(page, pageSize)
      .then((res) => {
        setLoading(false)
        setEmpty(res.data.videosCount === 0)
        setVideoList(res.data.videos)
        setVideoCOunt(res.data.videosCount)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [page])

  return (
    <>
      <Container maxWidth='xl' className='mb-10 space-y-10'>
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
        </Grid>
      </Container>

      {loading && <Loading />}
      {empty && <Empty>您还没有发布视频</Empty>}
    </>
  )
}
