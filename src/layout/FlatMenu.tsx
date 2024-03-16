import {
  VideoLibrary as VideoLibraryIcon,
  Subscriptions as SubscriptionsIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  LocalMovies as LocalMoviesIcon,
} from '@mui/icons-material'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Drawer,
  Divider,
  Box,
} from '@mui/material'
import { useLocation, Link } from 'react-router-dom'

import { useStore } from '@/store'

export default function FlatMenu({ menuOpen }) {
  const { userId } = useStore()

  const MENU = [
    {
      text: '首页',
      path: '/',
      icon: <HomeIcon />,
      last: false,
    },
    {
      text: '订阅内容',
      path: 'subvideo',
      icon: <VideoLibraryIcon />,
      last: false,
    },
    {
      title: '我的',
      text: '关注的频道',
      path: 'subchannel',
      icon: <SubscriptionsIcon />,
      last: true,
    },
    {
      text: '你的频道',
      path: userId,
      icon: <LocalMoviesIcon />,
      last: true,
    },
    {
      text: '个人信息',
      path: 'userinfo',
      icon: <AccountCircleIcon />,
      last: false,
    },
  ]

  const location = useLocation()
  const currentRoute =
    location.pathname === '/' ? '/' : location.pathname.slice(1)

  return (
    <Drawer variant='permanent' className='overflow-hidden' anchor='left'>
      <List className='min-h-screen dark:bg-gray-900'>
        {MENU.map((item, index) => (
          <Box key={index}>
            <ItemMenu
              last={item.last}
              item={item}
              menuOpen={menuOpen}
              currentRoute={currentRoute}
            />
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

// 菜单项
function ItemMenu({ last, item, currentRoute, menuOpen }) {
  const styles = {
    selected: {
      borderLeft: '5px purple solid',
    },
  }

  const sanitizedCurrentRoute = currentRoute.replace(/^\//, '')
  const sanitizedItemPath = item.path?.replace(/^\//, '')

  let curRoute = false
  if (sanitizedCurrentRoute === '') {
    curRoute = sanitizedItemPath === ''
  } else {
    curRoute = sanitizedCurrentRoute.split('/').includes(sanitizedItemPath)
  }
  return (
    <Link to={item.path}>
      <ListItemButton
        sx={{
          ...(curRoute && styles.selected),
        }}>
        <ListItemIcon className='-mr-6 dark:text-white'>
          {item.icon}
        </ListItemIcon>
        {menuOpen && (
          <ListItemText className='dark:text-white' primary={item.text} />
        )}
      </ListItemButton>
      {last && (
        <div className='py-4'>
          <Divider className='dark:border-[0.5px] dark:border-white' />
        </div>
      )}
    </Link>
  )
}
