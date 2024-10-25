import express from "express"
import authentication from "../middleware/authentication.js";
import { addComment, deleteComment, editComment, likeUnlikeComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/addComment", authentication, addComment);
router.post("/likeUnlikeComment", authentication, likeUnlikeComment);
router.delete("/deleteComment", authentication, deleteComment);
router.post("/editComment", authentication, editComment)

export default router;