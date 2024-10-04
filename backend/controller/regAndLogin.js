import User from "../models/userDetails.js";
import bcryptjs from "bcryptjs"


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
        password: newPassword
    })
    return res.status(201).json({
        message: "Registration successful",
        success: true
    })
  } catch (error) {
    return res.status(500).json({
        message: "server error",
        success: false
    })
  }
};

//login process
export const login = async (req, res) =>{
    try{
        //destructure of username, password same like in register
        const {username, password} = req.body;
        //checking if there is username provided
        const findUser = await User.findOne({username});
        if(!findUser){
            return res.status(404).json({
                message:"User does not exist",
                success:false
            })
        }
        //comparing provided password with password of user
        const checkPassword = await bcryptjs.compare(password, findUser.password);
        if(checkPassword){
            return res.status(200).json({
                message: "Login successful",
                success: true,
            })
        }
        else{
            return res.status(401).json({
                message: "Incorrect Password",
                success: false,
            })
        }
    }catch(error){
        return res.status(500).json({
          message: "Server error",
          success: false,
        });
    }
}


