import { useState, useEffect } from 'react'
import { getRandomVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'

export default function MyChannelVideo() {
  const [videoList, setVideoList] = useState([])
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)

  // 视频列表请求
  useEffect(() => {
    getRandomVideosAPI()
      .then((res) => {
        setVideoList(res.data)
        setLoading(false)
        setEmpty(res.data.length === 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <VideoList videos={videoList} />

      {empty && <Empty>暂无推荐视频</Empty>}
      {loading && <Loading />}
    </>
  )
}
