import './App.css'
import Navbar from './pages/Navbar.jsx'
import Footer from './pages/Footer.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Marble from './pages/Marble.jsx'
import GraniteOnyx from './pages/GraniteOnyx.jsx'
import Travertine from './pages/Travertine.jsx'
import Ceramic from './pages/Ceramic.jsx'
import Quartz from './pages/Quartz.jsx'
import ContactUs from './pages/ContactUs.jsx'
import RecentProjects from './pages/RecentProjects.jsx'
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marble" element={<Marble />} />
        <Route path="/granite-onyx" element={<GraniteOnyx />} />
        <Route path="/travertine" element={<Travertine />} />
        <Route path="/ceramic" element={<Ceramic />} />
        <Route path="/quartz" element={<Quartz />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/our-recent-projects" element={<RecentProjects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
