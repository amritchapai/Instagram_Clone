import express from "express"
import { addPost, deletePost, editPost, getAllPosts, getUserPost, likeUnlikePost } from "../controller/postController.js";
import authentication from "../middleware/authentication.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/addPost",authentication, upload.single('image'), addPost);
router.post("/editPost/:id", authentication, editPost);
router.post("/likeUnlike/:id", authentication, likeUnlikePost);
router.delete("/deletePost/:id", authentication, deletePost);
router.get("/getAllPost", authentication, getAllPosts);
router.get("/getUserPosts", authentication, getUserPost);

export default router;