import express from 'express'
import { adminLogin } from '../controllers/adminLogin.js'
import { auth } from '../middlewares/auth.js'
import { approveCommentById, dashboardData, deleteCommentById, showAllBlogs, showAllComments } from '../controllers/adminControllers.js'

const adminRoutes = express.Router()

adminRoutes.post('/login', adminLogin)
adminRoutes.get('/dashboard', auth, dashboardData)
adminRoutes.get('/blogs', auth, showAllBlogs)
adminRoutes.get('/comments', auth, showAllComments)
adminRoutes.post('/delete-comment', auth, deleteCommentById)
adminRoutes.post('/approve-comment', auth, approveCommentById)

export default adminRoutes