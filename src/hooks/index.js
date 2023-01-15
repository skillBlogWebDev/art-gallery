import { useEffect, useState } from 'react'

export default () => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem('mode')) || 'light',
  )

  const toggleTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'))
      setTheme('light')
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'))
      setTheme('dark')
    }
  }

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode'))
    if (localTheme) {
      setTheme(localTheme)
      console.log(localTheme)
    }
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
