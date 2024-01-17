import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ menu }) {
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeRoute = (route) => {
    navigate(route)
  }

  return (
    <Box className='border-b-1 mt-2 w-full border-blue-600'>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'>
        <Tab onClick={() => handleChangeRoute(menu[0])} label='首页' />
        <Tab onClick={() => handleChangeRoute(menu[1])} label='视频' />
        <Tab onClick={() => handleChangeRoute(menu[2])} label='动态' />
      </Tabs>
    </Box>
  )
}
