import { login, myInfo, register } from "../controllers/user.js";
import express from "express";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/me",isAuthenticated, myInfo);  

export default router;