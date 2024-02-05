import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from "../middlewares/error.js";
import { User } from '../models/user.model.js';
import { sendToken } from '../utils/jwtToken.js';

//REGISTER THE USER
export const register = catchAsyncError(async (req, res, next) => {
	const { name, email, phone, role, password } = req.body;
	if (!name || !email || !phone || !role || !password) {
		return next(new ErrorHandler("Please fill all details!"))
	}
	const isEmail = await User.findOne({ email }); // agar user pahle se present hai to 
	if (isEmail) {
		return next(new ErrorHandler("Email is already exists!"))
	}
	// if user is not registered then proceed for register
	const user = await User.create({
		name,
		email,
		phone,
		role,
		password,
	});

	/*
	res.status(200).json({
		success: true,
		message: "User Registered!",
		user,
	});
	*/
	sendToken(user, 201, res, "User Registered Successfully!"); // from utils 
});




// LOGIN USER
export const login = catchAsyncError(async (req, res, next) => {
	const { email, password, role } = req.body; // YE FORM DATA SE AAYEGA.

	if (!email || !password || !role) {
		return next(
			new ErrorHandler("Please provide email,password and role", 400)
		);
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler(" invalid Email or Password", 400));
	}

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email or password", 400));
	}
	if (user.role !== role) {
		return next(new ErrorHandler("User with this role not found", 400));
	}
	sendToken(user, 201, res, "User logged in successfully!")

});

// USER LOGOUT FUNCTIONALITY
// order of writing the "req,res,next" is mandatory otherwise we will get the error
export const logout = catchAsyncError(async (req, res, next) => {
	res.status(201).cookie("generatedToken", "", {
		httpOnly: true,
		expires: new Date(Date.now()),
	}).json({
		success: true,
		message: "User logged out successfully!"
	});
});


//