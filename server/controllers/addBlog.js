import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/blogsModel.js'

export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, description, isPublished, category } = JSON.parse(req.body.blog)
        const imageFile = req.file

        if(!title || !description || !isPublished || !category || !imageFile){
            return res.json({ success : false, message : 'Incomplete fields' })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file : fileBuffer,
            fileName : imageFile.originalname,
            folder : '/blog'
        })

        const imageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                { quality : 'auto' },
                { format : 'webp' },
                { width : '1280' }
            ]
        })

        const image = imageUrl

        await Blog.create({
            title,
            subtitle,
            description,
            isPublished,
            category,
            image
        })

        res.json({ success : true , message : 'Blog uploaded successfully' })

    } catch (error) {
        res.json({ success : false, message : error.message })
    }
}