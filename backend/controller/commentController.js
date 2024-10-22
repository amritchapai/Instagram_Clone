import Comment from "../models/comment";
import Post from "../models/Posts";


//to add comment
export const addComment = async (req, res)=>{
    try {
        //get user id
        const commenter = req.id;
        //get the post id where the comment has been done
        const postId = req.params.id;
        //get the post
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }
        const description = req.body.description;
        //create a new comment
        const comment = await Comment.create({
            writer: commenter,
            description: description,
            post: postId
        })
        post.comments.push(comment._id);
        await post.save();
        return res.status(202).json({
            message: "Commented successfully",
            success: true,
        })

    } catch (error) {
        console.log(error)
    }
}

