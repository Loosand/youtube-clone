import { Button, Grid, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import MyChannelVideo from './Home'

import { subscribeAPI, unsubscribeAPI } from '@/api/channel'
import { getVideoAPI } from '@/api/video'
import { getVideoPlayAuthAPI } from '@/api/vod'
import { useStore } from '@/store'
import { type VideoModel } from '@/types/video'

declare global {
  interface Window {
    Aliplayer: unknown
  }
}

export default function VideoPage() {
  const { userId } = useStore()
  const [video, setVideo] = useState<VideoModel>(null)
  const { videoId } = useParams()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const navigate = useNavigate()

  const isSelf = userId === video?.user._id

  // 获取视频
  const fetchVideo = async (id) => {
    try {
      const res = await getVideoAPI(id)
      setVideo(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchVideo(videoId)
  }, [videoId, isSubscribed])

  const fetchPlayVideo = async (vodVideoId: string) => {
    const data = await getVideoPlayAuthAPI(vodVideoId)
    createPlayer(data)
  }

  // 当 video 变化时，触发 fetchPlayVideo
  useEffect(() => {
    if (video && video.vodVideoId) {
      fetchPlayVideo(video.vodVideoId)
    }
  }, [video])

  const createPlayer = (data) => {
    let onReady: (value: unknown) => void
    const p = new Promise((resolve) => {
      onReady = resolve
    })
    new window.Aliplayer(
      {
        id: 'J_prismPlayer',
        width: '100%',
        height: '700px',
        autoplay: false,
        vid: data?.VideoMeta.VideoId,
        playauth: data?.PlayAuth,
        cover: data?.VideoMeta.CoverURL,
      },
      function (player) {
        onReady(player)
      },
    )

    return p
  }

  const handleSubscribeClick = (e) => {
    e.stopPropagation()
    subscribeAPI(video?.user._id).then((res) => {
      if (Number(res.code) === 200) {
        setIsSubscribed(true)
      }
    })
  }

  const handleUnSubscribeClick = (e) => {
    e.stopPropagation()
    unsubscribeAPI(video?.user._id).then((res) => {
      if (Number(res.code) === 200) {
        setIsSubscribed(false)
      }
    })
  }

  return (
    <Grid className='min-h-screen bg-slate-400 p-5' container spacing={3}>
      <Grid item xs={12}>
        <Button variant='contained' onClick={() => window.history.back()}>
          返回
        </Button>
      </Grid>

      {/* VIDEO INFO */}
      <Grid item xs={12} md={8} lg={8}>
        <Grid container direction='column' spacing={3}>
          {/* VIDEO */}
          <Grid item>
            <Paper className='flex h-[600px] flex-col p-2'>
              {/* 阿里云播放器容器 */}
              <div className='prism-player' id='J_prismPlayer'></div>
            </Paper>
          </Grid>

          <Grid item spacing={3} container>
            <Grid item xs={12}>
              <Paper
                onClick={() => {
                  navigate(`/${video?.user._id}`)
                }}
                className='flex h-[7rem] cursor-pointer justify-between'>
                <div className='flex items-center gap-5'>
                  <img
                    src={video?.user.avatar}
                    className='h-full rounded-full p-4'
                    alt=''
                  />
                  <div className='flex flex-col items-start gap-2'>
                    <h2 className='text-xl font-semibold'>{video?.title}</h2>
                    <p className='text-base text-slate-800'>
                      {video?.description}
                    </p>
                  </div>
                </div>

                {!isSelf && (
                  <Button
                    className='w-20 whitespace-nowrap'
                    sx={{ width: '10rem' }}
                    variant={isSubscribed ? 'outlined' : 'contained'}
                    color='primary'
                    onClick={
                      isSubscribed
                        ? handleUnSubscribeClick
                        : handleSubscribeClick
                    }>
                    {isSubscribed ? '已订阅' : '订阅'}
                  </Button>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* COMMENT */}
          <Grid item>
            <Paper className='flex min-h-96 flex-col p-2'>
              <div>567</div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* RECOMMEND */}
      <Grid className='hidden p-8 sm:block' item xs={4}>
        <MyChannelVideo />
      </Grid>
    </Grid>
  )
}
