import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
  Box,
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
}

export default function VideoCard({
  loading,
  id,
  img,
  title,
  desc,
  auth,
  date,
}: VideoCardProps) {
  const navigate = useNavigate()
  dayjs.extend(relativeTime)

  const handleGoVideoDetail = () => {
    navigate(`/video/${id}`)
  }

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
        onClick={handleGoVideoDetail}
        elevation={3}
        sx={{
          borderRadius: 2,
        }}>
        <CardActionArea>
          {loading ? (
            <Skeleton
              sx={{ height: 140 }}
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

          <CardContent>
            {loading ? (
              <Skeleton
                animation='wave'
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography
                gutterBottom
                fontWeight={'semibold'}
                variant='h6'
                component='h6'>
                {title}
              </Typography>
            )}

            <Box className='flex justify-between'>
              {loading ? (
                <Skeleton
                  animation='wave'
                  height={10}
                  width='15%'
                  style={{ marginBottom: 6 }}
                />
              ) : (
                <Typography gutterBottom component='span'>
                  {auth}
                </Typography>
              )}

              {loading ? (
                <Skeleton
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
                animation='wave'
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography variant='body2' color='text.secondary'>
                {desc}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
