import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import GridBackground from './components/GridBackground'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <GridBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
