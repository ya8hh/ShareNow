import express from "express";
import {loginUser, registerUser,myProfile,
     userProfile, followAndUnfollow, logOutUser} from "../controllers/user.controller.js"
import { isAuth } from "../middleware/isAuth.js";
const router = express.Router();


router.post("/register",registerUser)
router.post("/login",loginUser);
router.get("/logout",isAuth,logOutUser);
router.get("/me",isAuth,myProfile);
router.get("/:id",isAuth,userProfile);
router.post("/follow/:id",isAuth,followAndUnfollow);



export default router;