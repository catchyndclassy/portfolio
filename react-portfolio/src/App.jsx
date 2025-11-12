import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WebDev from './pages/services/WebDev.jsx'
import Figma from './pages/services/Figma.jsx'
import Blog from './pages/services/Blog.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/webdev" element={<WebDev />} />
      <Route path="/figma" element={<Figma />} />
      <Route path="/blog" element={<Blog />} /> 
    </Routes>
  )
}

export default App
