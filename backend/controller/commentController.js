import Comment from "../models/comment";
import Post from "../models/Posts";
import User from "../models/userDetails";


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

export const likeUnlikeComment = async (req, res)=>{
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({
                message: "user not found",
                success: false
            })
        }
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId)
         if (!comment) {
           return res.status(404).json({
             message: "comment not found",
             success: false,
           });
         }
         //check if it is already liked or not 
         if(comment.likes.includes(userId)){
            await comment.likes.pull(userId);
            await comment.save();
            return res.status(200).json({
              message: "comment unliked",
              success: true,
            });
         }
         else{
            await comment.likes.push(userId);
            await comment.save();
            return res.status(200).json({
              message: "comment liked",
              success: true,
            });
         }
    } catch (error) {
         console.log(error)
    }
}

//to delete comment
export const deleteComment = async (req, res)=>{
    try {
        const userId = req.id;
        //comment id params ma hunchha
        const commentId = req.params.id;

        //get the comment from the comment id and as well as postid of that comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({
            message: "Comment does not exist",
            success: false,
          });
        }
        const postId = comment.post;
        //check for matching the owner with comment writer
        if(!userId.equals(comment.writer)){
            return res.status(403).json({
                message: "Unauthorized access",
                success: false
            })
        }
        //delete the comment
        await Comment.findByIdAndDelete(commentId);
        //pull the commentId which is in post
        const post = await Post.findById(postId);
        await post.comments.pull(commentId);
        await post.save();

        return res.status(202).json({
            message: "comment deleted",
            success: true
        })


    } catch (error) {
        console.log(error)
    }
}

//to edit comment
export const editComment = async (req, res)=>{
    try {
      const userId = req.id;
      //comment id params ma hunchha
      const commentId = req.params.id;

      //get the comment from the comment id
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({
          message: "Comment does not exist",
          success: false,
        });
      }
      //check for matching the owner with comment writer
      if (!userId.equals(comment.writer)) {
        return res.status(403).json({
          message: "Unauthorized access",
          success: false,
        });
      }
      //edit the comment
      const description = req.body.description;
      const editedComment = await Comment.findByIdAndUpdate(commentId, {
        $set:{
            description: description
        }
      }, {new: true}).populate({
        path: "writer",
        select: "username, profilePicture"
      })
      return res.status(202).json({
        message: "comment edited",
        success: true,
        editedComment
      });
    } catch (error) {
        console.log(error)
    }
}