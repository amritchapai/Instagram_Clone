import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/Posts.js";
import User from "../models/userDetails.js";

//to add posts
export const addPost = async (req, res) => {
  try {
    const caption = req.body.caption;
    const image = req.file;
    const userId = req.id;
    if (!image) {
      return res.status(400).json({
        message: "image is required",
        success: false,
      });
    }
    //image upload garna ko lagi
    //for image optimization we use sharp
    const optimizedImage = await sharp(image.buffer)
      .resize({ width: 800, height: 8000, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();
    //buffer bata dataUri ma change gareko
    const fileUri = `data:image/jpeg:base64,${optimizedImage.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      owner: userId,
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
        success: false,
      });
    }
    user.posts.push(post._id);
    await user.save();
    //populate in owner
    await post.populate({ path: "owner", select: "-password" });

    return res.status(201).json({
      message: "new post added",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//to edit posts
export const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({
        message: "post does not exist",
        success: false,
      });
    }
    //get the caption updated
    const updatedCaption = req.body.caption;
    //update the caption
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      caption: updatedCaption,
    });
    return res.status(200).json({
      message: "post edited",
      success: true,
      updatedPost,
    });
  } catch (error) {
    console.log(error);
  }
};

//to like and unlike post
export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    //find the post
    const postToLike = await Post.findById(postId);
    if (!postToLike) {
      return res.status(400).json({
        message: " post does not exist",
        success: false,
      });
    }
    //check whether the user has liked or not
    const hasLiked = postToLike.likes.includes(userId);
    if (!userLikes) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            likes: userId,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Post liked",
        success: true,
        post,
      });
    }
    //to unlike pull the id from likes in post
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: userId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Post unliked",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

//to delete post
export const deletePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    const postOwner = post.owner;
    if (postOwner.equals(userId)) {
      await Post.deleteOne({
        _id: postId,
      });
      return res.status(200).json({
        message: "Deletion successful",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get all the posts
export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "owner", select: "username, profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "writer", select: "username, profilePicture" },
      });

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: "No posts found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.log(error);
  }
};


//get only user posts
export const getUserPost = async(req, res)=>{
  try {
    const userId = req.id;

    const posts = await Post.find({owner: userId}).sort({createdAt: -1}).populate({
      path:'owner', select:'username, profilePicture',
    }).populate({
      path:'comments', sort: {createdAt: -1},
      populate:{
        path:'writer',
        select:'username, profilePicture'
      }
    });
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: "No posts found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.log(error)
  }
}