import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({ children }) {
  const isLogin = getToken()

  if (isLogin) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}
