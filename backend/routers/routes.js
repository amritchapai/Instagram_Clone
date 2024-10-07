import express from "express";
import { editProfile, login, logout, register, viewProfile} from "../controller/regAndLogin.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

//to register
router.post("/register", register);

//to login
router.post("/login", login);

//to logout
router.get("/logout", logout)

//to view profile
router.get("/instagram/:id", viewProfile);

//to edit
router.post("/edit",authentication, editProfile);

export default router