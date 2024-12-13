import Env from "./env.js"
import express from "express"
import cors from 'cors'
import verifyToken from "./middlewares/verifyToken.js"
import pool from "./middlewares/pool.js"
import userRoutes from "./routes/userRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import Broadcast from "./websockets/broadcast.js"
import DBModelConnection from "./models/dbModelConnection.js"
import cookieParser from "cookie-parser"

const env = new Env()
const chatService = new Broadcast()
const MySql = new DBModelConnection()
const poolConnection = await MySql._init_poolConnection()
chatService._init_()
env._init()

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:3000', // ระบุโดเมนของ frontend
    credentials: true,
}))
app.use(express.json()); // using for JSON payload
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(verifyToken)
app.use('/login', pool(poolConnection), loginRoutes)
app.use('/api/users', pool(poolConnection), userRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 