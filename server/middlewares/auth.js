import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = async (req,res,next)=>{

    const token = req.cookies["chatttu-token"];
    if(!token) return next(new ErrorHandler("Please login to access the route,401"));

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decodedData._id;
    next();

}


const adminOnly = async (req,res,next)=>{

    const token = req.cookies["chattu-admin-token"];

    if(!token) return next(new ErrorHandler("Only admin can access this route",401));

    const secretKey = jwt.verify(token,process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;

    if(!isMatched) return next(new ErrorHandler("only admin can access this route",401));


    next();


}
export {isAuthenticated,adminOnly};