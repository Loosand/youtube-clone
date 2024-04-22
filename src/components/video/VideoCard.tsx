import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router-dom'
import 'dayjs/locale/zh-cn'

type VideoCardProps = {
  loading: boolean
  id: string
  img: string
  title: string
  desc: string
  auth: string
  date: string
  className?: string
}

export default function VideoCard({
  loading,
  id,
  img,
  title,
  desc,
  auth,
  date,
  className,
}: VideoCardProps) {
  const navigate = useNavigate()
  dayjs.extend(relativeTime)

  const handleGoVideoDetail = () => {
    navigate(`/video/${id}`)
  }

  const isMobile = useMediaQuery('(max-width:768px)')

  // 发布时间
  function formatTimeDifference(timestamp) {
    const currentTime = dayjs()
    const targetTime = dayjs(timestamp)

    const diffInHours = currentTime.diff(targetTime, 'hour')

    if (diffInHours < 24) {
      return targetTime.fromNow() // xx小时前
    } else if (targetTime.isSame(currentTime, 'day')) {
      return '昨天' // 昨天
    } else {
      return targetTime.format('MM-DD') // 具体日期，例如 11-28
    }
  }

  return (
    <Grid item sm={12} md={6} lg={3}>
      <Card
        className={className}
        onClick={handleGoVideoDetail}
        elevation={3}
        sx={{
          borderRadius: 2,
        }}>
        <CardActionArea>
          {loading ? (
            <Skeleton
              className='dark:bg-gray-600'
              sx={{ height: 140, width: '100%' }}
              animation='wave'
              variant='rectangular'
            />
          ) : (
            <CardMedia
              component='img'
              className='h-48 w-80'
              image={img}
              alt='green iguana'
            />
          )}

          <CardContent className='dark:bg-gray-900 dark:text-white'>
            {loading ? (
              <Skeleton
                className='dark:bg-gray-600'
                animation='wave'
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography
                sx={{
                  fontSize: 14,
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: isMobile ? 'normal' : 'nowrap',
                }}
                gutterBottom
                fontWeight={'semibold'}
                variant='h6'
                component='h6'>
                {title}
              </Typography>
            )}

            <Box className='flex justify-between dark:text-white'>
              {loading ? (
                <Skeleton
                  className='dark:bg-gray-600'
                  animation='wave'
                  height={10}
                  width='15%'
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <Typography variant='h6' gutterBottom component='span'>
                  {auth}
                </Typography>
              )}

              {loading ? (
                <Skeleton
                  className='dark:bg-gray-600'
                  animation='wave'
                  height={10}
                  width='15%'
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <Typography gutterBottom component='span'>
                  {formatTimeDifference(date)}
                </Typography>
              )}
            </Box>

            {loading ? (
              <Skeleton
                className='dark:bg-gray-600'
                animation='wave'
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography
                sx={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                variant='body2'>
                {desc}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
