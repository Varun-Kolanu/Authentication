import { login, logout, myInfo, register } from "../controllers/user.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me",isAuthenticated, myInfo);  
router.get("/logout", logout);

export default router;