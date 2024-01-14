import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	List,
	Drawer,
	Divider,
} from "@mui/material"
import {
	VideoLibrary as VideoLibraryIcon,
	Subscriptions as SubscriptionsIcon,
	Home as HomeIcon,
	AccountCircle as AccountCircleIcon,
	LocalMovies as LocalMoviesIcon,
} from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

// 菜单列表
// TODO 增加 400 和 500 页面
const menuItem = [
	// 推荐视频
	{
		text: "首页",
		path: "/",
		icon: <HomeIcon />,
		last: false,
	},
	// 我订阅频道的视频
	{
		text: "订阅内容",
		path: "subscribe",
		icon: <VideoLibraryIcon />,
		last: false,
	},
	// 我订阅的频道
	{
		title: "我的",
		text: "关注的频道",
		path: "subscriptions",
		icon: <SubscriptionsIcon />,
		last: true,
	},
	// 我的频道
	{
		text: "你的频道",
		path: "home",
		icon: <LocalMoviesIcon />,
		last: true,
	},
	// // 管理视频
	// {
	// 	text: "你的视频",
	// 	path: "home/video",
	// 	icon: <VideoCameraFrontIcon />,
	// 	last: false,
	// },
	// // 管理评论
	// {
	// 	text: "你的评论",
	// 	path: "comment",
	// 	icon: <ModeCommentIcon />,
	// 	last: true,
	// },
	// 个人信息
	{
		text: "个人信息",
		path: "information",
		icon: <AccountCircleIcon />,
		last: false,
	},
	// {
	// 	text: "Charts",
	// 	path: "charts",
	// 	icon: <TableChartIcon />,
	// 	last: false,
	// },
]

export default function FlatMenu({ menuOpen }) {
	const location = useLocation()
	const currentRoute =
		location.pathname === "/" ? "/" : location.pathname.slice(1)

	return (
		<Drawer variant="permanent" className="overflow-hidden" anchor="left">
			<List>
				{menuItem.map((item, index) => (
					<div key={index}>
						<ItemMenu
							last={item.last}
							item={item}
							menuOpen={menuOpen}
							currentRoute={currentRoute}
						/>
					</div>
				))}
			</List>
		</Drawer>
	)
}

// 菜单项
function ItemMenu({ last, item, currentRoute, menuOpen }) {
	const styles = {
		selected: {
			borderLeft: "5px purple solid",
		},
	}

	return (
		<Link to={item.path}>
			<ListItemButton
				sx={{
					...(currentRoute === item.path && styles.selected),
				}}>
				<ListItemIcon className="-mr-6">{item.icon}</ListItemIcon>
				{menuOpen && <ListItemText primary={item.text} />}
			</ListItemButton>
			{last && (
				<div className="py-4">
					<Divider />
				</div>
			)}
		</Link>
	)
}
