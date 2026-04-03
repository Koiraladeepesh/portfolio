import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import StatusBar from './components/StatusBar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Lab from './pages/Lab.jsx'
import Experience from './pages/Experience.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Goals from './pages/Goals.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/lab"         element={<Lab />} />
        <Route path="/experience"  element={<Experience />} />
        <Route path="/blog"        element={<Blog />} />
        <Route path="/blog/:slug"  element={<BlogPost />} />
        <Route path="/goals"       element={<Goals />} />
        <Route path="/contact"     element={<Contact />} />
      </Routes>
      <StatusBar />
    </>
  )
}
