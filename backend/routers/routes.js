import express from "express";
import { login, register } from "../controller/regAndLogin.js";

const router = express.Router();

//to login
router.post("/login", login);

//to register
router.post("/register", register);


export default router