import { useEffect } from 'react'
import { Gallery } from './components/Gallery/Gallery'
import { Header } from './components/Header/Header'
import useDarkMode from './hooks/index'

function App() {
  const { theme, toggleTheme } = useDarkMode()

  const handleToggleMode = () => {
    toggleTheme()
    document.body.className = theme === 'dark' ? 'light-mode' : 'dark-mode'
  }

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode'
  }, [])

  return (
    <>
      <Header handleToggleMode={handleToggleMode} mode={theme} />
      <main>
        <Gallery mode={theme} />
      </main>
    </>
  )
}

export default App
