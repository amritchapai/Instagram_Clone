import jwt from "jsonwebtoken"

const authentication = async (req, res, next) =>{
    const userId = req.token._id;
    
}