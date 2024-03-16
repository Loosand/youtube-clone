import CircularProgress from '@mui/material/CircularProgress'

type LoadingProps = {
  height?: string
}

const Loading = ({ height }: LoadingProps) => {
  return (
    <div
      style={{ height: height ? height : '65vh' }}
      className='flex items-center justify-center'>
      <CircularProgress />
    </div>
  )
}

export default Loading
