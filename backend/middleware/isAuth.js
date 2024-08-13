import jwt from 'jsonwebtoken'

import {User} from "../models/user.model.js"

export const isAuth = async (req,res,next)=>{
    try {
         // Debugging: Log all incoming cookies
         console.log('Incoming Cookies:', req.cookies);

        const token = req.cookies.token;

        if(!token) return res.status(403).json({
            message:"Please Login"
        });


        // verify the token

        const decodedToken = jwt.verify(token,process.env.JWT_SEC);
        if(!decodedToken)  return res.status(403).json({
            message:"Token Expired",
        });

        req.user = await User.findById(decodedToken.id);

        if (!req.user) {
            return res.status(403).json({
                message: "User not found",
            });
        }

        next();


    } catch (error) {
        res.status(500).json({
            message:"Please Login"
        })
    }
}