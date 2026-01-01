import './App.css'
import Navbar from './pages/Navbar.jsx'
import Footer from './pages/Footer.jsx'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute.jsx';
import Home from './pages/Home.jsx'
import Marble from './pages/Marble.jsx'
import Granite from './pages/Granite.jsx'
import Travertine from './pages/Travertine.jsx'
import Ceramic from './pages/Ceramic.jsx'
import Quartz from './pages/Quartz.jsx'
import Mosaic from './pages/Mosaic.jsx'
import ContactUs from './pages/ContactUs.jsx'
import RecentProjects from './pages/RecentProjects.jsx'
import Blog from './pages/blog.jsx'
import Login from './pages/Adminpanel/login.jsx'
import BlogPost from './pages/Adminpanel/BlogPost.jsx'
import BlogDetail from './pages/Adminpanel/BlogDetail.jsx'
import BlogTable from './pages/Adminpanel/BlogTable.jsx'
import EditBlogPost from './pages/Adminpanel/EditBlogPost.jsx'

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marble" element={<Marble />} />
        <Route path="/granite" element={<Granite />} />
        <Route path="/travertine" element={<Travertine />} />
        <Route path="/ceramic" element={<Ceramic />} />
        <Route path="/quartz" element={<Quartz />} />
        <Route path="/mosaic" element={<Mosaic />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/our-recent-projects" element={<RecentProjects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/BlogDetail/:id" element={<BlogDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
          {/* protected admin routes */}
        <Route path="/Blogtable" element={<PrivateRoute><BlogTable /></PrivateRoute>} />
        <Route path="/EditBlogPost/:id" element={<PrivateRoute><EditBlogPost /></PrivateRoute>} />
        <Route path="/BlogPost" element={<PrivateRoute><BlogPost /></PrivateRoute>} />
      </Routes>
      {/* Hide Footer on admin panel pages (login, BlogPost, Blogtable, EditBlogPost) */}
      {(() => {
        const adminPrefixes = [
          "/login",
          "/blogpost",
          "/blogtable",
          "/editblogpost"
        ];
        const path = location.pathname.toLowerCase();
        const isAdminPage = adminPrefixes.some(prefix => path.startsWith(prefix));
        return !isAdminPage && <Footer />;
      })()}
    </>
  )
}

export default App
