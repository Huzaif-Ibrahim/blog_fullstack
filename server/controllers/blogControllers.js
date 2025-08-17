import main from "../configs/gemini.js"
import Blog from "../models/blogsModel.js"
import Comment from "../models/commentsModel.js"

export const getBlogById = async (req, res) => {
    const { blogID } = req.params
    try {
        const blog = await Blog.findById( blogID )

        if(!blog){
            return res.json({ success : false , message : 'No blog found' })
        }

        res.json({ success : true , blog })
        
    } catch (error) {
        res.json({ error : 'no blog by id' })
    }
} 

export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({ isPublished : true })

        res.json({ success : true, blogs })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const deleteblog = async (req,res) => {
    try {
        const { id } = req.body
        if(!id) return res.json({ success : false, message : 'Delete id Unavailable' })
        await Blog.findByIdAndDelete(id)

        // Delete all the comments which belongs to this blog
        await Comment.deleteMany({ blog : id })

        res.json({ success : true, message : 'Blog deleted successfully' })
    } catch (error) {
        res.json({ success : false, message : 'Error while deleting the blog' })
    }
}

export const toggleIsPublished = async (req,res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById( id )

        blog.isPublished = !blog.isPublished

        await blog.save()

        res.json({ success : true, message : "Toggled successfully" })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { name, comment, blog } = req.body
        await Comment.create({
            name,
            comment,
            blog
        })

        res.json({ success : true, message : 'Comment Added Successfully' })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
} 

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body
        const comments = await Comment.find({ blog : blogId, isApproved : true }).sort({ createdAt : -1 })
        res.json({ success : true, comments })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}

export const generateContent = async (req,res) => {
    try {
        const { prompt } = req.body
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format.')
        res.json({ success : true, content })
    } catch (error) {
        res.json({ success : false, message : error.message })
    }
} 