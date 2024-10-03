import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({})

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.mongoURL)
        console.log("DB connection successful")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB