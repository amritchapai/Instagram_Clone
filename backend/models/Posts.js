import mongoose, { mongo } from "mongoose";

//schema for post details
const postSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    caption: {type: String, default: ""},
    photo: {type: String, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}], 
},{ timestamps: true })

//schema to model
const Post = mongoose.model("Post", postSchema);

export default Post;