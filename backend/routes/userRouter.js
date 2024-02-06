import { Router } from "express";
//IMPORTING CONTROLLER.
import { getUser, register } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


// const router = express.Router();
// <!-- or -->
const router = Router();

//ALL ROUTES.
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser)


export default router;