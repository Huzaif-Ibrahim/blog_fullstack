import express from 'express'
import upload from '../middlewares/multer.js'
import { addBlog } from '../controllers/addBlog.js'
import { auth } from '../middlewares/auth.js'
import { addComment, deleteblog, generateContent, getAllBlogs, getBlogById, getBlogComments, toggleIsPublished } from '../controllers/blogControllers.js'

const blogRoutes = express.Router()

blogRoutes.post('/add', upload.single('image'), auth, addBlog)
blogRoutes.get('/all', getAllBlogs)
blogRoutes.get('/:blogID', getBlogById)
blogRoutes.post('/delete', auth, deleteblog)
blogRoutes.post('/toggle-ispublished', auth, toggleIsPublished)
blogRoutes.post('/add-comment', addComment)
blogRoutes.post('/comments', getBlogComments)
blogRoutes.post('/generate-content', auth, generateContent)

export default blogRoutes