import express from "express"
import { addPost, deletePost, editPost, likeUnlikePost } from "../controller/postController";
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/addPost",authentication, addPost);
router.post("/editPost/:id", authentication, editPost);
router.post("/likeUnlike/:id", authentication, likeUnlikePost);
router.delete("/deletePost/:id", authentication, deletePost);
