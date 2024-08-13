import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name Is Required"]
    },
    email:{
        type:String,
        required:[true,"Email Is Required"],
        unique:[true,"Already User Exist"]
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]

},
    {timestamps:true})


export const User = mongoose.model("User",userSchema)