import express from "express"
import authentication from "../middleware/authentication.js";
import { addComment, deleteComment, editComment, likeUnlikeComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/addComment/:id", authentication, addComment);
router.post("/likeUnlikeComment/:id", authentication, likeUnlikeComment);
router.delete("/deleteComment/:id", authentication, deleteComment);
router.post("/editComment/:id", authentication, editComment)

export default router;