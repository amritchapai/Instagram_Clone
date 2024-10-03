import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({})
import connectDB from "./utils/db.js";


//setting port from the environment variables
const PORT = process.env.PORT || 8080;

const app = express();


//to get 
app.get("/",(req, res)=>{
    return res.status(200).json({
        message: "hello front",
        success: true
    })
})



//running the server
 app.listen(PORT, async () => {
   await connectDB();
   console.log(`server listen at port ${PORT}`);
 });



 app.use(express.json());
app.use(cookieParser());
// app.use(urlencoded({extended: true}))