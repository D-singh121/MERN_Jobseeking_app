import ErrorHandler from "../middlewares/error.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Job } from '../models/job.model.js';


//Fetching all the jobs
export const getAllJobs = catchAsyncError(async (req, res, next) => {
	const jobs = await Job.find({ expired: false });
	res.status(200).json({
		success: true,
		jobs,
	});
});

// Adding jobs for Employer.
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
		return next(new ErrorHandler("Can't enter fixed salary and Ranged salary togather!", 400));
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


// Fetching all job for a perticular user by user_id.
export const getmyJobs = catchAsyncError(async (req, res, next) => {
	const { role } = req.user;
	if (role === "JobSeeker") {
		return next(
			new ErrorHandler(" JobSeeker is not allowed to access this resource", 400)
		);
	}
	const myjobs = await Job.find({ postedBy: req.user._id }); // hum user_id se perticular user ki jobs find kar sakte hai.
	res.status(200).json({
		success: true,
		myjobs
	})
});


export const updateJobs = catchAsyncError(async (req, res, next) => {
	const { role } = req.user;
	if (role === " JobSeeker") {
		return next(
			new ErrorHandler("JobSeeker is not allowed to access this resources", 400)
		);
	}

	const { id } = req.params;  // request parameter se Job ki Id le lenge.
	let job = await Job.findById(id);
	if (!job) {
		return next(
			new ErrorHandler("Oops, Job not found! ", 404)
		);
	}
	job = await Job.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: false,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		job,
		message: "Job updated successfully! ",
	})
})


export const deleteJobs = catchAsyncError(async (req, res, next) => {
	const { role } = req.user;
	if (role === " JobSeeker") {
		return next(
			new ErrorHandler("JobSeeker is not allowed to access this resources", 400)
		);
	}
	const { id } = req.params;
	let job = await Job.findById(id);
	if (!job) {
		next(
			new ErrorHandler("Oops, Job not found! ", 404)
		);
	}

	await job.deleteOne();
	res.status(200).json({
		success: true,
		message: "Job Deleted Successfully!"
	});
});