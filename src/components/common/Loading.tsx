import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({ height }: { height?: string }) => {
  return (
    <div
      style={{ height: height ? height : '65vh' }}
      className='flex items-center justify-center'>
      <CircularProgress />
    </div>
  )
}

export default Loading
