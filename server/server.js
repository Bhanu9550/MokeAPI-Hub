import 'dotenv/config';
import express from "express";
const app = express()

const PORT = process.env.PORT || 8080;
import connectDB from "./db/connect.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authController from './controllers/authController.js';
import jsonController from './controllers/jsonController.js';

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials : true
}))

app.use("/", authController)

app.use("/api", jsonController)

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`server is running at http://localhost:${PORT}`)
        connectDB()
    }
})