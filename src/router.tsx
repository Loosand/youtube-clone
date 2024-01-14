import { createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Dashboard'
import Home, { loader as homeLoader, action as homeAction } from '@/pages/Home'
import ErrorPage from '@/pages/ErrorPage'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // index: true,
        path: '/home/:id',
        element: <Home />,
        loader: ({ params }) => homeLoader(params.id),
        action: homeAction,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
