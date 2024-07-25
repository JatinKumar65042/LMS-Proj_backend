import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn=async (req,res,next)=>{
    const token=(req.cookies && req.cookies.token) || null
    if(!token){
        return next(new AppError("Unauthenticated, please login again",401))
    }
    const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
    req.user=userDetails;
    next();
}

const authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentUserRoles = req.user.role;
    if(!roles.includes(currentUserRoles)){
        return next(
            new AppError("You don't have permission to excess this route",403)
        )
    }
    next();
}

export{
    isLoggedIn,
    authorizedRoles
}