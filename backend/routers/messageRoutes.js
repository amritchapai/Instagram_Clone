import express from "express";
import authentication from "../middleware/authentication.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/sendMessage/:id", authentication, sendMessage);
router.get("/getMessage/:id", authentication, getMessages);

export default router;
