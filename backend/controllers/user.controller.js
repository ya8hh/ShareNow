

import {User} from "../models/user.model.js"
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async (req,res)=>{
    const {name,email,password} = req.body; // accessing all this from body of request deconstructing

        let user = await User.findOne({email}); // chacking if the user exist


        if(user) return res.status(400).json({
            message:"Already Have Account With This Email"  // returning error if usrr exist
        })

        const hashpass = await bcrypt.hash(password,10);  // id user dont exixt then encrypting the password for storing in DB.

        user = await User.create(      // creating user when it dont exist
            {name,
            email,
            password:hashpass,}
        );

        res.status(201).json({    // sending ths status of 200 for okkkkk
            user,
            message:"User Registerd",
        })

})


export const loginUser = TryCatch(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"no user with this email",
        });
    }
     const comparePass = await bcrypt.compare(password,user.password);
    if(!comparePass){
        return res.status(400).json({
            message:"Wrong Password",
        });
    }

    generateToken(user._id,res);

    res.json({
        user,
        message:"Logged In"
    })
})

export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
})

export const userProfile= TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id)
    .select("-password");
    res.json(user);
});
export const followAndUnfollow = TryCatch(async (req,res)=>{
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if(!user) return res.status(400).json({
        message:" User Not Found"
    });
    if(user._id.toString()=== loggedInUser._id.toString()){
        return res.status(400).json({
            message:"You Can't Follow Yourself"
        });

    }
    if(user.followers.includes(loggedInUser._id)){
        const indexFollowing =loggedInUser.following.indexOf(user._id);
        const indexFollowers =user.followers.indexOf(loggedInUser._id);
        loggedInUser.following.splice(indexFollowing,1);
        user.followers.splice(indexFollowers,1);
        await loggedInUser.save();
        await user.save();

        res.json({
            message:"User Unfollowed"
        })

    }else{
        loggedInUser.following.push(user._id);
        user.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await user.save();

        res.json({
            message:"User followed"
        })

    }


});
export const logOutUser = TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});

    res.json({
        message:"Logged Out Sucessfully",
    })
})