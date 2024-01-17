import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
      }}>
      <CircularProgress />
    </div>
  )
}

export default Loading
