import upload from "../middlewares/multer.middleware.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary"
import fs from "fs/promises"

const cookieOptions={
    maxAge:7*24*60*60*1000,  //7days
    httpOnly:true,
    // secure:true
}

const register=async (req,res,next)=>{
    const {fullName, email, password,role}=req.body;
    if(!fullName || !email || !password){
        return next(new AppError("All Fields are required",400));
    }
    const userExists=await User.findOne({email});
    if(userExists){
        return next(new AppError("User already Exists",400));
    }
    try {
        const user =await User.create({
            fullName,
            email,
            password,
            avatar:{
                public_id:email,
                secure_url:'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user'
            },
            role
        })
    
        if(!user){
            return next(new AppError("User registration failed,please try again",400))
        }
    
        //TODO: File upload
        // console.log('File Details > ',JSON.stringify(req.file));
        if(req.file){
            
            try {
                const result=await cloudinary.v2.uploader.upload(req.file.path,{
                    folder:'lms',
                    width:250,
                    height:250,
                    gravity:'faces',
                    crop: 'fill'
            })

                if(result){
                    user.avatar.public_id=result.public_id;
                    user.avatar.secure_url=result.secure_url;

                    //Remove File from server
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (err) {
                return next(new AppError(err.message || "File not uploaded, Please try again",500))
            }
        }
    
        await user.save();
        
        const token=await user.generateJWTToken();
        user.password=undefined;
        res.cookie('token',token, cookieOptions);
    
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user,
        })
    } catch (err) {
        return next(new AppError(err.message,400));
    }
    
}

const login=async (req,res,next)=>{

    try {
        const {email,password}=req.body;

    if(!email || !password){
        return next(new AppError("All fields are required",400))
    }

    const user= await User.findOne({email}).select('+password');
    if(!user || !user.comparePassword(password)){
        return next(new AppError("Email or password does not match",400))
    }

    const token=await user.generateJWTToken();
    user.password=undefined;
    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success:true,
        message:"User logged in sucessfully",
        user
    })
    } catch (err) {
        return next(new AppError(err.message,500))
    }
    
}

const logout=(req,res)=>{
    res.cookie('token',null, {
        secure:true,
        maxAge:0,
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"User Logged out Successfully"
    })
}

const getProfile=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId);

        res.status(200).json({
            success:true,
            message:"User Details",
            user
        })
    } catch (err) {
        return next(new AppError("Failed to fetch user details",400));
    }
    
}

const forgotPassword= async(req,res,next)=>{
    // const {email}=req.body;
    // if(!email){
    //     return next(new AppError('Email is required',400));
    // }

    // const user= await User.findOne({email});
    // if(!user){
    //     return next(new AppError('Email not registered',400));
    // }

    // const resetToken=await user.generatePasswordResetToken();

    // await user.save();

    // const resetPasswordURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // const subject='Reset Password'
    // const message=`${resetPasswordURL}`;

    // try {
    //     await sendEmail(email,subject,message);
    //     res.status(200).json({
    //         success:true,
    //         message:`Reset password token has been send to ${email} successfully`
    //     })
    // } catch (err) {
    //     user.forgotPasswordToken=undefined;
    //     user.forgotPasswordExpiry=undefined;

    //     await user.save();
    //     return next(new AppError(e.message,500));
    // }
}

const resetPassword=()=>{

}


export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
}