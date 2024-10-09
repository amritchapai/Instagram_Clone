import User from "../models/userDetails.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataURI from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

//function to register
export const register = async (req, res) => {
  try {
    //username, email and password are destrucre ie username = req.body.username
    const { username, email, password } = req.body;

    //checking if username, email and password not present
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "can't get the required number of fields",
        success: false,
      });
    }

    //checking if there is another user with same username
    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(409).json({
        message: "username already taken",
        success: false,
      });
    }
    //hashing of password
    const newPassword = await bcryptjs.hash(password, 10);
    //creating new user
    await User.create({
      username: username,
      email: email,
      password: newPassword,
    });
    return res.status(201).json({
      message: "Registration successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//login process
export const login = async (req, res) => {
  try {
    //destructure of username, password same like in register
    const { username, password } = req.body;
    //checking if there is username provided
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }
    //comparing provided password with password of user
    const checkPassword = await bcryptjs.compare(password, findUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Incorrect Password",
        success: true,
      });
    }
    //token ma user id rakhna ko lagi
    const payload = {id:findUser._id};
    //token banaako from jwt
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"});
    //token lai cookie ma rakheko
    console.log(token);
    //user ma password bahek userko sab details hunchha front end ma pathauna
    //password napathaune kinaki thaha hunu hudaina aru lai
    const user = {
      username: findUser.username,
      email: findUser.email,
      DOB: findUser.DOB,
      profilePicture: findUser.profilePicture,
      gender: findUser.gender,
      followers: findUser.followers,
      following: findUser.following,
      posts: findUser.posts,
      StartedFrom: findUser.StartedFrom,
    };
    return res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .json({
        user,
        message: "login successful",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//logout process
export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      //deleting token ie replacing token with "" whose age is 0
      message: "logout successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//show userDetails
export const viewProfile = async (req, res) => {
  try {
    //get the id of user
    const userId = req.params.id;
    //get user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
      });
    }
    // return res.status(201).send(user);
    return res.status(201).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//to edit the profile by profile owner
export const editProfile = async (req, res)=>{
  try {
    //get the userId
    const userId = req.id;

    //find the user for that id
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message: "user not found",
        success: false,
      })
    }
    //destructure the obtained details
    const { username, DOB, gender } = req.body;
    //get file
    const profilePicture = req.file;
    let cloudResponse
    if(profilePicture)
    {   
        //convert to base64- encoded string
        const fileURI = getDataURI(profilePicture);
        //upload that string to cloudinary
        cloudResponse = await cloudinary.uploader.upload(fileURI);
        if(cloudResponse && cloudResponse.secure_url){
          user.profilePicture = cloudResponse.secure_url;
        }
     }
     if(username){
        user.username = username
     }
     if(DOB){
      user.DOB = DOB
     }
     if(gender){
      user.gender = gender
     }
     await user.save();
     return res.status(200).json({
      message : "profile updated",
      success: true,
      user
     })
  } catch (error) {
    console.log(error)
  }
  


}

//to get suggested user 
export const suggestedUser = async(req, res)=>{
  try {
    const userId = req.id;
    //finding all other user except the user who is login and store all details except password
    const users = await User.find({
      _id: { $ne: userId }
    }).select("-password");
    //if array is empty then first item is not there 
    if (users[0] == null) {
      return res.status(400).json({
        message: "there are no suggested users to show",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.log(error)
  }
}


//follow and unfollow
export const followUnfollow = async(req, res) =>{
 try {
   //userId who follows ie account owner
   const whoFollowsId = req.id;
   //userId who is followed by the account owner
   const whoIsFollowedId = req.params.id;
   if(whoFollowsId === whoIsFollowedId){
    return res.status(401).json({
      message: "Can't follow/unfollow yourself",
      success: false
    })
   }
   //their respective user
   const whoFollows = await User.findById(whoFollowsId);
   const whoIsFollowed = await User.findById(whoIsFollowedId);
   if (!whoIsFollowed) {
     return res.status(404).json({
       message: "User not found",
       success: false,
     });
   }
   //if whoFollows is already following
   const isFollowing = whoFollows.following.includes(whoIsFollowedId);
   //if isFollowing is true then it is for unfollow
   if(isFollowing){
    // to do all the operations inside use use Promise
      await Promise.all([
        User.findByIdAndUpdate(whoFollowsId, {$pull:{following : whoIsFollowedId
        }
        }),
        User.findByIdAndUpdate(whoIsFollowedId, {$pull:{followers : whoFollowsId
        }
        })
      ]);
       return res.status(200).json({
         message: "Unfollow successful",
         success: true,
       });
   }
   else{
    await Promise.all([
      User.findByIdAndUpdate(whoFollowsId, {
        $push: { following: whoIsFollowedId },
      }),
      User.findByIdAndUpdate(whoIsFollowedId, {
        $push: { followers: whoFollowsId },
      }),
    ]);
     return res.status(200).json({
       message: "Follow successful",
       success: true,
     });
   }
  
 } catch (error) {
  console.log(error)
 }
}
