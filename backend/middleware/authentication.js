import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const authentication = async (req, res, next) =>{
    //get the token
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Can't perform the action",
            success: false,
        })
    }
    //decoded gets paylod from token which we have stored which has userid
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if(!decoded){
        return res.status(401).json({
            message: "Unauthorized access",
            success: false
        })
    }

    //store id in req.id which will be used in edit profile
    req.id = decoded.id;
    next();
}

export default authentication;