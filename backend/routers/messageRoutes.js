import express from "express";
import authentication from "../middleware/authentication.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/sendMessage", authentication, sendMessage);
router.get("/getMessage", authentication, getMessages);

export default router;
