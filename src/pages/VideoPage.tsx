import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { subscribeAPI, unsubscribeAPI } from '@/api/channel'
import { getRandomVideosAPI, getVideoAPI } from '@/api/video'
import { getVideoPlayAuthAPI } from '@/api/vod'
import { VideoCard } from '@/components'
import { useStore } from '@/store'
import { VideoUserRes } from '@/types/user'
import { type VideoModel } from '@/types/video'

declare global {
  interface Window {
    Aliplayer: unknown
  }
}

export default function VideoPage() {
  const navigate = useNavigate()
  const { videoId } = useParams()
  const { userId, setToast } = useStore()
  const [video, setVideo] = useState<VideoModel & { user: VideoUserRes }>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const isSelf = userId === video?.user._id

  const fetchVideo = async (id) => {
    try {
      const res = await getVideoAPI(id)
      setVideo(res.data)
      setIsSubscribed(res.data.user.isSubscribed)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment])
      setComment('')
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

  const { data: videoList, isLoading } = useQuery(
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

  // const { data: commentList, isLoading: commentLoading } = useQuery(
  //   'comments',
  //   async () => {
  //     const res = await getCommentAPI(videoId, { pageNum: 1, pageSize: 8 })
  //     return res.data
  //   },
  // )

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
                  navigate(`/${video?.user._id}?isSubscribed=${isSubscribed}`)
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
                  <Box className='flex items-center p-10'>
                    <Button
                      className='h-16 w-20 whitespace-nowrap'
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
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* COMMENT */}
          <Grid item>
            <Paper className='flex flex-col p-4'>
              <TextField
                label='发表评论'
                variant='outlined'
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />

              <Button
                variant='contained'
                color='primary'
                onClick={handleAddComment}>
                发布评论
              </Button>

              <List style={{ marginTop: '1rem' }}>
                {comments?.length === 0 ? (
                  <ListItem>空空如也</ListItem>
                ) : (
                  <>
                    {comments?.map((comment, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={comment.content} />
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* RECOMMEND */}
      <Grid className='hidden p-8 sm:block' item xs={4}>
        <Grid container spacing={3} direction='column'>
          {videoList?.map((item: VideoModel) => (
            <VideoCard
              loading={isLoading}
              img={item.cover}
              key={item._id}
              id={item._id}
              title={item.title}
              auth={item.user.username}
              desc={item.description}
              date={item.updatedAt}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
