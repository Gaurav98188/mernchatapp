import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const cookieOptions = {
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true,
}
 

const connectDB = (url)=>{

    mongoose.connect(url,{dbName:"Chattu"})
    .then((data)=>{
        console.log(`connected to DB:${data.connection.host}`)

    })
    .catch((err)=>{

        throw err;
    })
}

const sendToken = (res,user,code,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    
    return res
    .status(code)
    .cookie("chatttu-token",token,cookieOptions)
    .json({
    success:true,
    token,
    message,
    user
    })

}

const emitEvent = (req,event,users,data)=>{
    console.log("emmiting event");
}

const deleteFilesFromCloudinary = async(public_ids)=>{
    //delete files from cloudinary
}


export {connectDB,sendToken,cookieOptions,emitEvent,deleteFilesFromCloudinary}