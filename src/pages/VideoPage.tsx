import { getVideoAPI } from '@/api/video'
import { getVideoPlayAuthAPI } from '@/api/vod'
import { useState, useEffect } from 'react'
import { Box, Button, Container, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

declare global {
  interface Window {
    Aliplayer: any
  }
}

export default function VideoPage() {
  const [video, setVideo] = useState(null)
  const [playerData, setPlayerData] = useState(null)
  const { videoId } = useParams()

  // 获取视频列表
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
  }, [videoId])

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

  return (
    <Grid className='bg-slate-400 p-5' container spacing={3}>
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
            <Grid item xs={8}>
              <Paper className='h-20'>123</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className='h-20'>123</Paper>
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
      <Grid item className='hidden sm:block' xs={12} md={4} lg={4}>
        <Paper className='flex h-screen flex-col p-2'>
          <div>456</div>
        </Paper>
      </Grid>
    </Grid>
  )
}
