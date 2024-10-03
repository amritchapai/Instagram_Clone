import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    writer : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    description: {type: String, required: true},
    likes : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;