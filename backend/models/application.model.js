import mongoose from "mongoose";
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
	name: {
		type: String,
		lowercase: true,
		required: [true, "Please enter your Name!"],
		minLength: [3, "Name must contain at least 3 Characters!"],
		maxLength: [30, "Name cannot exceed 30 Characters!"],
	},
	email: {
		type: String,
		required: [true, "Please enter your Email!"],
		validate: [validator.isEmail, "Please provide a valid Email!"],
	},
	// It like a resume description or file
	coverLetter: {
		type: String,
		required: [true, "Please provide a cover letter!"],
	},
	phone: {
		type: Number,
		required: [true, "Please enter your Phone Number!"],
	},
	address: {
		type: String,
		required: [true, "Please enter your Address!"],
	},
	// it will be file of resume which will store in cloudnary.
	resume: {
		//cloudnary se aayega.
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	applicantID: {
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		role: {
			type: String,
			enum: ["JobSeeker"],
			required: true,
		},
	},
	employerID: {
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		role: {
			type: String,
			enum: ["Employer"],
			required: true,
		},
	},

})


export const Application = mongoose.model("Application", applicationSchema)