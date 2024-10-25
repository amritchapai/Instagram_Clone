import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({})
import connectDB from "./utils/db.js";
import router from "./routers/routes.js";
import postRouter from "./routers/postRoutes.js"
import commentRouter from "./routers/commentRoutes.js"
import messageRouter from "./routers/messageRoutes.js"


//setting port from the environment variables
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(router);
app.use(postRouter);
app.use(commentRouter);
app.use(messageRouter);

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


