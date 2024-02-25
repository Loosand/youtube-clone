import { useQuery } from 'react-query'
import { getRandomVideosAPI } from '@/api/video'
import VideoList from '@/components/video/VideoList'
import Loading from '@/components/common/Loading'
import Empty from '@/components/common/Empty'
import { useStore } from '@/store'

export default function MyChannelVideo() {
  const { setToast } = useStore()

  const {
    data: videoList,
    isLoading,
    isFetching,
  } = useQuery(
    'home-videos',
    async () => {
      const res = await getRandomVideosAPI()
      return res.data
    },
    {
      keepPreviousData: true,
      onError: (error) => {
        setToast(error, 'error')
      },
    },
  )

  if (isLoading) {
    return <Loading />
  }

  if (videoList?.length === 0) {
    return <Empty>暂无推荐视频</Empty>
  }

  return <VideoList loading={isFetching || isLoading} videos={videoList} />
}
