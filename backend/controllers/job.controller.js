import ErrorHandler from "../middlewares/error.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Job } from '../models/job.model.js';

export const getAllJobs = catchAsyncError(async (req, res, next) => {
	const jobs = await Job.find({ expired: false });
	res.status(200).json({
		success: true,
		jobs,
	});
});


export const postJob = catchAsyncError(async (req, res, next) => {
	const { role } = req.user;
	if (role === "JobSeeker") {
		return next(
			new ErrorHandler(
				"JobSeeker is not allowd to access this resources!",
				400
			)
		);
	}
	const {
		title,
		description,
		category,
		country,
		city,
		location,
		fixedSalary,
		salaryFrom,
		salaryTo,
	} = req.body;

	if (!title || !description || !category || !country || !city || !location) {
		return next(new ErrorHandler("Please provide all mandetory field.!", 400));
	}
	if ((!salaryFrom || !salaryTo) && !fixedSalary) {
		return next(new ErrorHandler("Please either provide fixed salary or ranged salary!", 400));
	}
	if (salaryFrom && salaryTo && fixedSalary) {
		return next(new ErrorHandler("Can't enter fixed salary and Ranged salary togather!" , 400));
	}
	const postedBy = req.user._id;

	const job = await Job.create({
		title,
		description,
		category,
		country,
		city,
		location,
		fixedSalary,
		salaryFrom,
		salaryTo,
		postedBy,
	});
	res.status(200).json({
		success: true,
		message: "Job posted successfully!",
		job,
	});
});
