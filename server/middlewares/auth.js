import jwt from 'jsonwebtoken'

export const auth = (req,res,next) => {
    const token = req.headers.authorization

    try {
        jwt.verify(token, process.env.SECRET_KEY) 
        next()
    } catch (error) {
        res.json({ message : error.message })
    } 
}