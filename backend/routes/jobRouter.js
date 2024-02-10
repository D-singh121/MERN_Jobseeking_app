import express from "express";
import { isAuthenticated } from '../middlewares/auth.js';
import { getAllJobs, getSingleJob } from "../controllers/job.controller.js";
import { postJob } from "../controllers/job.controller.js";
import { getmyJobs } from "../controllers/job.controller.js";
import { updateJobs } from "../controllers/job.controller.js";
import { deleteJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getalljob", getAllJobs);
router.post("/post", isAuthenticated, postJob)
router.get("/getmyjobs", isAuthenticated, getmyJobs)
router.put("/updatejob/:id", isAuthenticated, updateJobs)
router.delete("/deletejob/:id", isAuthenticated, deleteJobs)
router.get("/:id", isAuthenticated, getSingleJob) //get single job by job_id
export default router;