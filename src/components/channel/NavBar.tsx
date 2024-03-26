import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type NavBarProps = {
  menu: string[]
}

export default function NavBar({ menu }: NavBarProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (_e, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeRoute = (route: string) => {
    navigate(route)
  }

  return (
    <Box className='border-b-1 mt-2 w-full border-blue-600'>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'>
        {/* <Tab onClick={() => handleChangeRoute(menu[0])} label='首页' /> */}
        <Tab onClick={() => handleChangeRoute(menu[0])} label='视频' />
        <Tab onClick={() => handleChangeRoute(menu[1])} label='动态' />
      </Tabs>
    </Box>
  )
}
