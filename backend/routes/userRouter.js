import express from "express";
import { register } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import { isAuthorized } from "../middlewares/auth.js";


const router = express.Router();

//ALL ROUTES.
router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorized, logout)


export default router