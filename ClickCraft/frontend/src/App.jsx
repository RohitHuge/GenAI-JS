import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeContext'
import { ThumbnailProvider } from './components/ThumbnailContext'
import Home from './pages/Home'
import ThumbnailGenerator from './pages/ThumbnailGenerator'

function App() {
  return (
    <ThemeProvider>
      <ThumbnailProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/thumbnail-generator' element={<ThumbnailGenerator />} />
          </Routes>
        </BrowserRouter>
      </ThumbnailProvider>
    </ThemeProvider>
  )
}

export default App
