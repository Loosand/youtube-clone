import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import dayjs from 'dayjs'

function CommentItem({
  userAvatar,
  userName,
  comment,
  date,
  canDelete = false,
  onDelete,
}: {
  userAvatar: string
  userName: string
  comment: string
  date: string
  canDelete: boolean
  onDelete: () => void
}) {
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
    <Paper elevation={3} className='mb-4 cursor-pointer p-8'>
      <Grid container wrap='nowrap' className='items-center' spacing={2}>
        <Grid item>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt={userName}
            src={userAvatar}
          />
        </Grid>

        <Grid item xs direction={'column'} className='gap-4'>
          <Box className='text-xl font-semibold'>{userName}</Box>

          <Box className='text-md'>{comment}</Box>

          <Box className='text-sm text-gray-500'>
            {formatTimeDifference(date)}
          </Box>
        </Grid>

        {canDelete && (
          <IconButton onClick={onDelete} className='self-end'>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Paper>
  )
}

export default CommentItem
