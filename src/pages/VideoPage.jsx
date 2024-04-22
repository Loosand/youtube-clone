import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  Box,
  Button,
  Grid,
  ListItem,
  Paper,
  IconButton,
  TextField,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { subscribeAPI, unsubscribeAPI } from '@/api/channel'
import { getRandomVideosAPI, getVideoAPI, deleteVideoAPI, getCommentAPI, addCommentAPI, deleteCommentAPI, collectVideoAPI, cancelCollectVideoAPI } from '@/api/video'
import { getVideoPlayAuthAPI } from '@/api/vod'
import { VideoCard, CusDialog, CommentItem } from '@/components'
import { useStore } from '@/store'
import { getToken } from '@/utils'

// declare global {
//   interface Window {
//     Aliplayer: unknown
//   }
// }

export default function VideoPage() {
  const isLogin = getToken()
  const navigate = useNavigate()
  const { videoId } = useParams()
  const { userId, setToast } = useStore()
  const [isSelf, setIsSelf] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { data: video } = useQuery(
    ['video-info', videoId],
    async () => {
      const res = await getVideoAPI(videoId)
      return res.data
    },
    {
      onSuccess: (res) => {
        setIsSubscribed(res?.user?.isSubscribed)
        setIsSelf(res?.user?._id === userId)
      },
      onError: (error) => {
        console.error(error)
      },
      enabled: !!videoId,
    },
  )

  useQuery(
    ['player-auth', videoId],
    async () => {

      const res = await getVideoPlayAuthAPI(video.vodVideoId)
      return res.data
    },
    {
      retry: false,
      enabled: !!video && !!video.vodVideoId,
      onSuccess: (data) => {
        createPlayer(data)
      },
      onError: (error) => {
        console.error(error)
      },
    },
  )

  //   const fetchPlayVideo = async (vodVideoId) => {
  //     const data = await getVideoPlayAuthAPI(vodVideoId)
  //     createPlayer(data)
  //   }
  // 
  //   // 当 video 变化时，触发 fetchPlayVideo
  //   useEffect(() => {
  //     if (video && video.vodVideoId) {
  //       fetchPlayVideo(video.vodVideoId)
  //     }
  //   }, [video])

  const createPlayer = (data) => {
    let onReady
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
    <Grid className='min-h-screen bg-slate-400 p-5 dark:bg-slate-700 dark:text-white' container spacing={3}>
      {/* VIDEO INFO */}
      <Grid item xs={12} md={8} lg={8}>
        <Grid container direction='column' spacing={3}>
          <Header isLogin={isLogin} isCollect={video?.isLicked} isSelf={isSelf} videoId={videoId} setToast={setToast} navigate={navigate} />

          <Player />

          <UserBar isLogin={isLogin} isSelf={isSelf} video={video} userId={userId} isSubscribed={isSubscribed} navigate={navigate} setIsSubscribed={setIsSubscribed} />

          <Comment isSelf={isSelf} isLogin={isLogin} videoId={videoId} navigate={navigate} />

        </Grid>
      </Grid>

      {/* RECOMMEND */}
      <Grid className='hidden p-8 sm:block' item xs={12} md={4}>
        <Recommend setToast={setToast} />
      </Grid>
    </Grid>
  )
}

function Header({ isLogin, isCollect, videoId, setToast, navigate, isSelf }) {
  const [cIsCollect, setCIsCollect] = useState(isCollect)
  const [open, setOpen] = useState(false)
  const handleConfirmDeleteVideo = (e) => {
    e.stopPropagation()

    deleteVideo()
    setOpen(false)
  }

  const [showNextPageButton, setShowNextPageButton] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      const historyLength = window.history.length
      setShowNextPageButton(historyLength > 1)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const { refetch: deleteVideo } = useQuery(
    'video-delete',
    async () => {
      const res = await deleteVideoAPI(videoId)
      return res.data
    },
    {
      enabled: false,
      onSuccess: () => {
        setToast('视频删除成功', 'success')
        navigate('/')
      },
      onError: (error) => {
        setToast(error, 'error')
      },
    },
  )

  const { refetch: collectVideo } = useQuery(
    ['video-collect', cIsCollect],
    async () => {
      const res = await (cIsCollect ? cancelCollectVideoAPI : collectVideoAPI)(videoId)
      return res.data
    },
    {
      enabled: false,
      onSuccess: () => {
        setCIsCollect(!cIsCollect)
        setToast(`${cIsCollect ? '取消收藏' : '收藏'}成功`, 'info')
      },
      onError: (error) => {
        setToast(error, 'error')
      },
    },
  )

  return <Grid item className='flex justify-between items-center mb-5' xs={12}>
    <Box className='flex gap-3'>
      <Button variant='contained' startIcon={<HomeIcon />} onClick={() => navigate('/')}>
        返回首页
      </Button>

      <IconButton onClick={() => window.history.back()}>
        <ChevronLeftIcon />
      </IconButton>

      {showNextPageButton && (
        <IconButton onClick={() => window.history.back()}>
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>

    <Box className='flex gap-3'>
      <IconButton onClick={() => {
        if (!isLogin) {
          navigate('/login')
          return
        }
        collectVideo()
      }} >
        {cIsCollect ? <StarRateIcon /> : < StarBorderIcon />}
      </IconButton>

      {isSelf && (
        <Button
          variant='contained'
          startIcon={<DeleteIcon />}
          color='error'
          onClick={() => {
            if (!isLogin) {
              navigate('/login')
              return
            }
            setOpen(true)
          }}>
          删除视频
        </Button>
      )}
    </Box>

    <CusDialog
      title='确认删除视频'
      content='确定要删除该视频？'
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={handleConfirmDeleteVideo}
    />
  </Grid >
}

function Player() {
  return <Grid item>
    <Paper className='flex h-[600px] flex-col p-2 dark:bg-slate-900 dark:text-white'>
      {/* 阿里云播放器容器 */}
      <div className='prism-player ' id='J_prismPlayer'></div>
    </Paper>
  </Grid>

}

function UserBar({
  isSelf,
  video,
  isSubscribed,
  navigate,
  setIsSubscribed,
}) {
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
    <Grid item spacing={3} container>
      <Grid item xs={12}>
        <Paper
          onClick={() => {
            navigate(`/${video?.user._id}?isSubscribed=${isSubscribed}`)
          }}
          className='flex h-[7rem] cursor-pointer justify-between dark:bg-slate-900 dark:text-white'>
          <div className='flex items-center gap-5'>
            <img
              src={video?.user.avatar}
              className='h-full rounded-full p-4'
              alt=''
            />
            <div className='flex flex-col overflow-clip items-start gap-2'>
              <h2 className='text-sm md:text-base w-full text-ellipsis overflow-clip text-nowrap font-semibold'>{video?.title}</h2>
              <p className='text-base text-ellipsis overflow-clip'>
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
  )
}

function Comment({ isLogin, isSelf, videoId, navigate }) {
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      addCommentAPI(videoId, { content: comment }).then((res) => {
        setComments([res.data, ...comments])
        setComment('')
      })
    }
  }

  const { isFetching } = useQuery(
    ['comments', videoId],
    async () => {
      const res = await getCommentAPI(videoId, { pageNum: 1, pageSize: 8 })
      return res.data
    },
    {
      initialData: [],
      onSuccess: (data) => {
        setComments(data.comments)
      },
    },
  )

  const handleDeleteComment = () => {
    deleteCommentAPI(videoId, selectedComment._id).then(() => {
      setComments(comments.filter((comment) => comment._id !== selectedComment._id))
      setOpen(false)
      setSelectedComment(null)
    })
  }

  return (
    <Grid item>
      <Paper className='flex flex-col p-4 dark:bg-slate-900 dark:text-white'>
        <TextField
          label='发表评论'
          variant='outlined'
          fullWidth
          className='dark:bg-slate-800 dark:text-white'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />

        <Button
          variant='contained'
          color='primary'
          endIcon={<SendIcon />}
          disabled={comment.trim() === ''}
          onClick={() => {
            if (!isLogin) {
              navigate('/login')
              return
            }
            handleAddComment()
          }}>
          发布评论
        </Button>

        <CusDialog
          title='确认删除评论'
          content='确定要删除该评论？'
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={handleDeleteComment}
        />

        <Box className='mt-5'>
          {isFetching ? <ListItem>加载中...</ListItem> :

            <>
              {comments?.length > 0 ? (
                <>
                  {comments?.map((comment) => (
                    <div key={comment._id}>
                      <CommentItem
                        canDelete={isSelf}
                        userId={comment.user._id}
                        date={comment.createdAt}
                        userAvatar={comment.user.avatar}
                        userName={comment.user.username}
                        comment={comment.content}
                        onDelete={() => {
                          setOpen(true)
                          setSelectedComment(comment)
                        }}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <ListItem>空空如也</ListItem>
              )}
            </>
          }
        </Box>
      </Paper>
    </Grid >
  )
}

function Recommend({ setToast }) {
  const { data: videoList, isLoading } = useQuery(
    'home-videos',
    async () => {
      const res = await getRandomVideosAPI()
      return res.data.splice(0, 5)
    },
    {
      keepPreviousData: true,
      onError: (error) => {
        setToast(error, 'error')
      },
    },
  )

  return <Grid spacing={3} direction='column'>
    {videoList?.map((item) => (
      <VideoCard
        className="my-5"
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
}