import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Preloader from './components/Preloader/Preloader'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import AIFinderPage from './pages/AIFinderPage'
import Inventory from './pages/Inventory'
import CarDetail from './pages/CarDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'

const queryClient = new QueryClient()

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  const [showPreloader] = useState(() => {
    if (sessionStorage.getItem('carbone_loaded')) return false
    return true
  })

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('carbone_loaded', 'true')
    setPreloaderDone(true)
  }

  const websiteVisible = preloaderDone || !showPreloader

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {showPreloader && !preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
        <Navbar visible={websiteVisible} />
        <div style={{ opacity: websiteVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/inventory" element={<Inventory />} />
             <Route path="/inventory/:id" element={<CarDetail />} />
             <Route path="/ai-finder" element={<AIFinderPage />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App