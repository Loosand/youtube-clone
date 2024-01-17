import { IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const className = theme ? 'dark' : ''
    document.documentElement.setAttribute('class', className)
  }, [theme])

  const toggleDarkMode = () => {
    setTheme(!theme)
  }

  return (
    <IconButton
      size='large'
      color='inherit'
      aria-label='open drawer'
      onClick={toggleDarkMode}>
      {theme ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
    // <button
    //   className='rounded bg-white px-4 py-2 text-black  dark:bg-black dark:text-white'
    //   onClick={toggleDarkMode}>
    //   {theme ? '切换到明亮模式' : '切换到暗黑模式'}
    // </button>
  )
}

export default DarkModeToggle
