import Blog from "../models/blogsModel.js"
import Comment from "../models/commentsModel.js"

export const dashboardData = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({createdAt : -1}).limit(5)
        const totalBlogs = await Blog.countDocuments()
        const draftBlogs = await Blog.countDocuments({ isPublished : false })
        const totalComments = await Comment.countDocuments()

        const DashboardData = {
            blogs,
            totalBlogs,
            totalComments,
            draftBlogs
        }

        res.json({ success : true, DashboardData })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const showAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt : -1 })

        res.json({ success : true, blogs })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const showAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('blog').sort({ createdAt : -1 })

        res.json({ success : true, comments })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndDelete(id)

        res.json({ success : true, message : 'Comment deleted successfully' })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndUpdate(id, { isApproved : true })

        res.json({ success : true, message : 'Comment approved successfully.' })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

