import express from "express"
import { addPost, deletePost, editPost, getAllPosts, getUserPost, likeUnlikePost } from "../controller/postController";
import authentication from "../middleware/authentication";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/addPost",authentication, upload.single('image'), addPost);
router.post("/editPost/:id", authentication, editPost);
router.post("/likeUnlike/:id", authentication, likeUnlikePost);
router.delete("/deletePost/:id", authentication, deletePost);
router.get("/getAllPost", authentication, getAllPosts);
router.get("/getUserPosts", authentication, getUserPost);
