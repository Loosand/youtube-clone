import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Box } from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import 'dayjs/locale/zh-cn'

export default function VideoCard({ id, img, title, desc, auth, date }) {
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
          <CardMedia
            component='img'
            className='h-48 w-80'
            image={img}
            alt='green iguana'
          />
          <CardContent>
            <Typography
              gutterBottom
              fontWeight={'semibold'}
              variant='h6'
              component='h6'>
              {title}
            </Typography>

            <Box className='flex justify-between'>
              <Typography gutterBottom component='span'>
                {auth}
              </Typography>
              <Typography gutterBottom component='span'>
                {formatTimeDifference(date)}
              </Typography>
            </Box>

            <Typography variant='body2' color='text.secondary'>
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
