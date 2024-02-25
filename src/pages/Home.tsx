import { useQuery } from 'react-query'
import { getRandomVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'
import { useStore } from '@/store'

export default function MyChannelVideo() {
  const { setToast } = useStore()

  const { data: videoList, isLoading } = useQuery(
    'home-videos',
    async () => {
      const res = await getRandomVideosAPI()
      return res
    },
    {
      keepPreviousData: true,
      onSuccess: (res) => {
        setToast(res.message, 'success')
      },
    },
  )

  return (
    <>
      <VideoList videos={videoList?.data} />

      {Boolean(videoList?.data.length === 0) && <Empty>暂无推荐视频</Empty>}
      {isLoading && <Loading />}
    </>
  )
}
