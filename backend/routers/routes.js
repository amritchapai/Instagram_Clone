import express from "express";
import { login, register, viewProfile } from "../controller/regAndLogin.js";

const router = express.Router();

//to login
router.post("/login", login);

//to register
router.post("/register", register);

//to view profile
router.get("/instagram/:id", viewProfile);

export default router