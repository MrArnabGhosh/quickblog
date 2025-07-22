import express from "express"
import 'dotenv/config'
import cors from 'cors'

const app = express()


app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>res.send("APi is working"))

const port = 3000 || process.env.PORT

app.listen(port,()=>{
    console.log('server is running on port ' + port)
})

export default app