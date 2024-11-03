import dotenv from 'dotenv'
import express , {Express, Request, Response} from 'express'

dotenv.config()

const server:Express = express()
const PORT = process.env.PORT || 3000
server.get("/", (req:Request, res:Response)=>{
    res.send("It's simple server")
})

server.listen(PORT, ()=>{console.log(`Server is listening on ${PORT} port`)})