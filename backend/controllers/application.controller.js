import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import cloudinary from "cloudinary"

export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
	/*
	// commented beacuse we are using userRoleCheck middleware.
	const { role } = req.user;
	if (role === "JobSeeker") {
		return next(
			new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
		);
	}
	*/
	try {
		const { _id } = req.user;
		console.log(_id);
		const applications = await Application.find({ "employerID.user": _id });
		res.status(200).json({
			success: true,
			applications,
		});
	} catch (next) {
		return next(new ErrorHandler("Failed to fetch applications", 500));
	}
}
);


// JobSeeker apni sari application dekh sakta hai.
export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next) => {
	/*
	// commented beacuse we are using userRoleCheck middleware.
	const { role } = req.user;
	if (role === "Employer") {
		return next(
			new ErrorHandler("Employer can't access this resourcs ", 400)
		)
	};
	*/

	try {
		const { _id } = req.user;
		const applications = await Application.find({ "applicantID.user": _id });
		res.status(200).json({
			success: true,
			applications,
		})
	} catch (next) {
		return next(new ErrorHandler("Failed to fetch applications", 500));

	}
});



// Jobseeker can delete there application but employer not.
export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
	const { role } = req.user;
	if (role === "Employer") {
		return next(
			new ErrorHandler("Employer can't delete this resourcs ", 400)
		)
	};

	try {
		const { id } = req.params;
		const application = await Application.findById(id);
		if (!application) {
			return next(
				new ErrorHandler("Oop's application not found", 404)
			)
		};
		await application.deleteOne();
		res.status(200).json({
			success: true,
			message: "Application deleted!."
		});

	} catch (next) {
		return next(new ErrorHandler("Failed to fetch applications", 500));
	}

});


// the hardest one posting the applications.
export const postApplication = catchAsyncError(async (req, res, next) => {

	/* Insted of this we are using the middleware.
	const { role } = req.user;
	if (!role === "Jobseeker") {
		return next(
			new ErrorHandler("Employer not allowed to access this resource.", 400)
		);
	}
	*/

	if (!req.files || Object.keys(req.files).length === 0) {
		return next(new ErrorHandler("Resume File Required!", 400));
	}

	const { resume } = req.files;
	const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
	if (!allowedFormats.includes(resume.mimetype)) {
		return next(
			new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
		);
	}
	const cloudinaryResponse = await cloudinary.uploader.upload(
		resume.tempFilePath
	);

	if (!cloudinaryResponse || cloudinaryResponse.error) {
		console.error(
			"Cloudinary Error:",
			cloudinaryResponse.error || "Unknown Cloudinary error"
		);
		return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
	}
	const { name, email, coverLetter, phone, address, jobId } = req.body;
	const applicantID = {
		user: req.user._id,
		role: "JobSeeker",
	};
	if (!jobId) {
		return next(new ErrorHandler("Job not found!", 404));
	}
	const jobDetails = await Job.findById(jobId);
	if (!jobDetails) {
		return next(new ErrorHandler("Job not found!", 404));
	}

	const employerID = {
		user: jobDetails.postedBy,
		role: "Employer",
	};
	if (
		!name ||
		!email ||
		!coverLetter ||
		!phone ||
		!address ||
		!applicantID ||
		!employerID ||
		!resume
	) {
		return next(new ErrorHandler("Please fill all fields.", 400));
	}
	const application = await Application.create({
		name,
		email,
		coverLetter,
		phone,
		address,
		applicantID,
		employerID,
		resume: {
			public_id: cloudinaryResponse.public_id,
			url: cloudinaryResponse.secure_url,
		},
	});
	res.status(200).json({
		success: true,
		message: "Application Submitted!",
		application,
	});
});