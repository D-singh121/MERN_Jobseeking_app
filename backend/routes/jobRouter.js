import express from "express";
import { isAuthenticated } from '../middlewares/auth.js';
import { getAllJobs } from "../controllers/job.controller.js";
import { postJob } from "../controllers/job.controller.js";
import { getmyJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getalljob", getAllJobs);
router.post("/post", isAuthenticated, postJob)
router.get("/getmyjobs", isAuthenticated, getmyJobs)

export default router;