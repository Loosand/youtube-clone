import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Guard from './components/common/Guard'
import Layout from './layout/Dashboard'
import Channel from './pages/Channel'
import ChannelDynamic from './pages/ChannelDynamic'
// import ChannelHome from './pages/ChannelHome'
import ChannelVideo from './pages/ChannelVideo'
import Login from './pages/Login'
import Register from './pages/Register'
import SubChannel from './pages/SubChannel'
import SubVideo from './pages/SubVideo'
import UserInfo from './pages/UserInfo'
import VideoPage from './pages/VideoPage'

import ErrorPage from '@/pages/ErrorPage'
import Home from '@/pages/Home'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Guard>
              <Layout />
            </Guard>
          }>
          <Route index element={<Home />} />

          <Route path=':userId' element={<Channel />}>
            {/* <Route index element={<ChannelHome />} /> */}
            <Route index element={<ChannelVideo />} />
            <Route path='dynamic' element={<ChannelDynamic />} />
          </Route>

          <Route path='subchannel' element={<SubChannel />} />
          <Route path='subvideo' element={<SubVideo />} />
          <Route path='userinfo' element={<UserInfo />} />
        </Route>

        <Route path='video/:videoId' element={<VideoPage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <Guard>
//         <Layout />
//       </Guard>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: 'home',
//         element: <Home />,
//         children: [
//           {
//             index: true,
//             element: <Home />,
//           },
//           {
//             path: 'video',
//             element: <Home />,
//           },
//           {
//             path: 'dynamic',
//             element: <Home />,
//           },
//         ],
//       },
//       {
//         path: '/userinfo',
//         element: <UserInfo />,
//       },
//       {
//         path: '/upload',
//         element: <Home />,
//       },
//     ],
//   },
//   {
//     path: '/:userId/:videoId',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
//   {
//     path: '*',
//     element: <ErrorPage />,
//   },
// ])

// export default router
