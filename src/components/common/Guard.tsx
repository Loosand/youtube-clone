import { Navigate } from 'react-router-dom'

import { getToken } from '@/utils'

type AuthRouteProps = {
  children: React.ReactNode
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const isLogin = getToken()

  if (isLogin) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}
