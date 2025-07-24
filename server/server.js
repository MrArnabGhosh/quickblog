import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./db/index.js"
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"

const app = express()

connectDB()

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>res.send("APi is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

const port = 3000 || process.env.PORT

app.listen(port,()=>{
    console.log('server is running on port ' + port)
})

export default app