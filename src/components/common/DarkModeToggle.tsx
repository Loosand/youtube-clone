import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton } from '@mui/material'
import { useState, useEffect } from 'react'

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
  )
}

export default DarkModeToggle
