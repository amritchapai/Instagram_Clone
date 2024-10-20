
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
    await post.populate({path:'owner', select:'-password'})

    return res.status(201).json({
        message: "new post added",
        post,
        success: true
    })
  } catch (error) {
    console.log(error);
  }
};

//to edit posts
export const editPost = async (req, res)=>{
  
}