import {
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  List,
  Drawer,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import TableChartIcon from '@mui/icons-material/TableChart'
import VideocamIcon from '@mui/icons-material/Videocam'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'

import { useState } from 'react'
import { Link } from 'react-router-dom'

// 菜单列表
const menu = [
  // 推荐视频
  {
    text: '首页',
    path: 'home',
    icon: <HomeIcon />,
  },
  {
    primaryText: '频道',
    icon: <VideocamIcon />,
    secondaryItems: [
      // 我的订阅频道的视频
      {
        text: '订阅内容',
        path: 'subscribe',
        icon: <VideoLibraryIcon />,
      },
      // 我的订阅频道
      {
        text: '关注的频道',
        path: 'subscriptions',
        icon: <SubscriptionsIcon />,
      },
    ],
  },
  {
    primaryText: '我的',
    icon: <PersonIcon />,
    secondaryItems: [
      // 创建视频
      {
        text: '你的频道',
        path: 'self',
        icon: <LocalMoviesIcon />,
      },
      // 管理视频
      {
        text: '你的视频',
        path: 'video',
        icon: <VideoCameraFrontIcon />,
      },
      // 管理评论
      {
        text: '你的评论',
        path: 'comment',
        icon: <ModeCommentIcon />,
      },
    ],
  },
  {
    text: '创建视频',
    path: 'upload',
    icon: <HomeIcon />,
  },
  // 个人信息
  {
    text: '个人信息',
    path: 'information',
    icon: <AccountCircleIcon />,
  },
  {
    text: 'Charts',
    path: 'charts',
    icon: <TableChartIcon />,
  },
]

export default function FoldMenu({ menuOpen }) {
  // 二级菜单控制展开
  const [open, setOpen] = useState({
    menu1: true,
    menu2: true,
    menu3: true,
    menu4: true,
  })
  const onHandleToggle = (menu) => {
    setOpen((preOpenMenu) => ({
      ...preOpenMenu,
      [menu]: !preOpenMenu[menu],
    }))
  }

  // 获取当前菜单
  const [selectedItem, setSelectedItem] = useState('home')
  const onHandleMenuItemClick = (item) => {
    setSelectedItem(item)
  }

  return (
    <Drawer variant='permanent' className='overflow-hidden' anchor='left'>
      <List>
        {menu.map((item, index) => (
          <div key={index}>
            {item.primaryText ? (
              // 一级可折叠菜单
              <OneMenu
                key={index}
                selectedItem={selectedItem}
                handleToggle={onHandleToggle}
                item={item}
                index={index}
                open={open}
                menuOpen={menuOpen}
              />
            ) : (
              // 一级菜单项
              <ItemMenu
                level={1}
                item={item}
                menuOpen={menuOpen}
                selectedItem={selectedItem}
                handleMenuItemClick={onHandleMenuItemClick}
              />
            )}

            {/* 折叠菜单 */}
            <Collapse
              in={open[`menu${index + 1}`]}
              timeout='auto'
              unmountOnExit>
              <List component='div' disablePadding>
                {item.secondaryItems?.map((i, index) => (
                  <ItemMenu
                    key={index}
                    item={i}
                    menuOpen={menuOpen}
                    handleMenuItemClick={onHandleMenuItemClick}
                    selectedItem={selectedItem}
                  />
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  )
}

// 可折叠菜单
function OneMenu({ selectedItem, item, index, handleToggle, open, menuOpen }) {
  return (
    <ListItemButton
      selected={selectedItem === `menu${index + 1}`}
      onClick={() => handleToggle(`menu${index + 1}`)}>
      <ListItemIcon className='-mr-6'>{item.icon}</ListItemIcon>
      {menuOpen && <ListItemText primary={item.primaryText} />}
      {menuOpen && open[`menu${index + 1}`] ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  )
}

// 菜单项
function ItemMenu({
  item,
  selectedItem,
  handleMenuItemClick,
  level = 2,
  menuOpen,
}) {
  const styles = {
    selected: {
      borderLeft: '5px purple solid',
    },
    levelTwo: {
      paddingLeft: '36px',
    },
  }

  return (
    <Link to={item.path}>
      <ListItemButton
        // className="pl-10"
        sx={{
          ...(selectedItem === item.path && styles.selected),
          ...(menuOpen && level === 2 && styles.levelTwo),
        }}
        onClick={() => handleMenuItemClick(item.path)}>
        <ListItemIcon className='-mr-6'>{item.icon}</ListItemIcon>
        {menuOpen && <ListItemText primary={item.text} />}
      </ListItemButton>
    </Link>
  )
}
