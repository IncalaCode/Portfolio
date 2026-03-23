import { useState, useEffect } from 'react'
import LoadingPage from './components/LoadingPage'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show loading for 5 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CustomCursor />
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <HeroSection />
          <AboutSection />
          <ContactSection />
        </>
      )}
    </>
  )
}

export default App
