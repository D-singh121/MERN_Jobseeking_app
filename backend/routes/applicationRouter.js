import express from "express";
import { employerGetAllApplications, jobseekerGetAllApplications, jobSeekerDeleteApplication } from "../controllers/application.controller.js";
import { isAuthenticated } from '../middlewares/auth.js';
import { userRoleCheck } from '../middlewares/userRoleCheck.js';
import { postApplication } from "../controllers/application.controller.js";

const router = express.Router(); // initializing the router

router.post("/jobseeker/applyjob", isAuthenticated, userRoleCheck("JobSeeker"), postApplication)
router.get("/employer/getall", isAuthenticated, userRoleCheck("Employer"), employerGetAllApplications)
router.get("/jobseeker/getall", isAuthenticated, userRoleCheck("JobSeeker"), jobseekerGetAllApplications)
router.delete("/jobseeker/delete/:id", isAuthenticated, jobSeekerDeleteApplication)

export default router;