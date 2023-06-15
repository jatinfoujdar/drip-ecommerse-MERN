import User from "../Models/userSchema"
import JWT from "jsonwebtoken"
import asyncHandler from "../Services/asyncHandler.js"
import CustomError from "../utils/customError"
import config from "../Config/index.js"


export const isLoggedIn = asyncHandler(async(req , _res, next)=>{
    let token;
    if (
        req.cookies.token || 
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        ) {
        
            token =req.cookies.token  || req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new CustomError("not authrised this access route",401)
    }

    try {
     const decodeJwtPayload = JWT.verify(token,config.JWT_SECRET)
    req.user = await User.findone(decodeJwtPayload._id,"name email role")
    next()
    } catch (error) {
        throw new CustomError("not authrised this access route",401)
    }
})