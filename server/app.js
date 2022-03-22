import 'dotenv/config'
import express from 'express'
import Mongoose from "mongoose"
import cors from 'cors'
import authrouter from './router/auth.router.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8000;
const app = express()
const BD_URL='mongodb+srv://user:user@cluster0.1detr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use('/auth', authrouter)

const Start = () => {
  app.listen(PORT, async () => {
    try {
      await Mongoose.connect(BD_URL)
      console.log(`server running ${PORT}`)
    } catch (e) {
      console.log(e)

    }
  })
}
Start();