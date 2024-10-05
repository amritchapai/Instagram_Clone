import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({})
import connectDB from "./utils/db.js";
import registerRouter from "./routers/routes.js";


//setting port from the environment variables
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(registerRouter)

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


