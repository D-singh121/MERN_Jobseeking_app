import express from "express";
import { getAllJobs } from "../controllers/job.controller.js";
import { postJob } from "../controllers/job.controller.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/getalljob", getAllJobs);
router.post("/post", isAuthenticated, postJob)
// router.get("/") 

export default router;