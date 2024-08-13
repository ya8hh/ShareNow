import express from "express"
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";
import { commentOnPin, createPin, deleteComment, deletePin, getAllPins, getSinglePin, updatePin } from "../controllers/pin.controller.js";

const router = express.Router();
router.post("/new",isAuth,uploadFile,createPin);
router.get("/all",isAuth,getAllPins);
router.get("/:id",isAuth,getSinglePin);
router.put("/:id",isAuth,updatePin);

router.post("/comment/:id",isAuth,commentOnPin);
router.delete("/comment/:id", isAuth, deleteComment);
router.delete("/:id", isAuth, deletePin);

export default router;
