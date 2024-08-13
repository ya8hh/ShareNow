import express from 'express'
import dotenv from 'dotenv'
import connectDB from "./database/db.js"
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";

import path from "path";

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key:process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
})

const app = express();
const port =process.env.PORT;
// using inbuilt middleware

app.use(express.json());
app.use(cookieParser());

//importing routes from user.routes.js

import userRoutes from "./routes/user.routes.js"
import pinRoutes from "./routes/pin.routes.js"

// using routes
app.use("/api/user",userRoutes);
app.use("/api/pin",pinRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});







app.listen(port ,()=>{
    console.log(`server started at http://localhost:${port}`)
    connectDB();


})