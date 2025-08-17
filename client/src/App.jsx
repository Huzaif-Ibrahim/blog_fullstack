import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import BlogList from './pages/admin/BlogList'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'react-quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast'
import { useContextState } from './context/Context'

const App = () => {
  const { token } = useContextState()
  return (
    <>
        <Toaster />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/blog/:id'} element={<Blog />} />
        <Route path='/admin' element={token ? <Layout /> : <Login /> } >
          <Route index element={<Dashboard />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path='bloglist' element={<BlogList />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
    </>
  )
}

export default App