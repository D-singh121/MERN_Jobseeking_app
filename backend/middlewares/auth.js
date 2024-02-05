import { catchAsyncError } from "./catchAsyncError.js";  // async wrrapper 
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';


export const isAuthenticated = catchAsyncError(async (req, res, next) => {
	const { generatedToken } = req.cookies; // fetching token from cookies
	// agar koi user login nahi hai to hume token nahi milega usko hum error me handle kar rahe hai.
	if (!generatedToken) {
		return next(new ErrorHandler("User is not authorized", 401));
	}
	// agar token mil jata hai to usse decode karenge humare jwt token se match karne ke liye
	const decoded = jwt.verify(generatedToken, process.env.JWT_SECRET_KEY); // comparing user token and our jwt secret .

	req.user = await User.findById(decoded.id);  // database se hum user ka details get karenge userId se jo ki hume decoded me mil rahi hai.
	next(); // after user get authorized we can perform further tasks.
}); 