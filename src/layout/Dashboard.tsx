import { useState } from 'react'
import { styled, Breakpoint } from '@mui/material/styles'
import {
  CssBaseline,
  Drawer as MuiDrawer,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
// import FoldMenu from "./Menu"
import FlatMenu from './FlatMenu'
import Profile from '../components/user/Profile'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import Toast from '@/components/common/Toast'
import DarkModeToggle from '@/components/common/DarkModeToggle'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

export default function Dashboard() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(true)
  const { setUploadState } = useStore()

  const handleUploadOpen = () => {
    setUploadState(true)
    navigate('/upload')
  }

  // 菜单折叠
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Toast />

      <Box className='flex'>
        <CssBaseline />

        {/* AppBar */}
        <AppBar className='fixed' open={open}>
          <Toolbar className='space-x-3 bg-red-500 pr-6 dark:bg-gray-800'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              edge='start'
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}>
              <MenuIcon />
            </IconButton>

            <Typography
              className='flex-grow'
              variant='h5'
              noWrap
              component='div'>
              Youtube
            </Typography>

            <IconButton onClick={handleUploadOpen} size='large' color='inherit'>
              <VideoCallIcon />
            </IconButton>

            <IconButton size='large' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <DarkModeToggle />

            <Profile />
          </Toolbar>
        </AppBar>

        {/* Sider */}
        <Drawer variant='permanent' open={open}>
          <Toolbar className='flex items-center justify-end px-2 dark:bg-gray-500'>
            <DarkModeToggle />

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <FlatMenu menuOpen={open} />
        </Drawer>

        {/* CONTENT */}
        <Box
          component='main'
          className='h-screen flex-grow overflow-auto dark:bg-gray-500'>
          <Toolbar />
          <Container maxWidth={'2xl' as Breakpoint} className='mb-8 mt-8'>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  )
}
