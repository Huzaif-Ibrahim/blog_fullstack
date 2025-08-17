import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectToDb from './configs/db.js'
import adminRoutes from './routes/adminRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()

// DB connection
connectToDb()

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send('API is Working')
})
app.use('/api/admin' ,adminRoutes)
app.use('/api/blog' ,blogRoutes)

app.listen(process.env.PORT, () => {
    console.log('App is running on the port', process.env.PORT)
})

export default app