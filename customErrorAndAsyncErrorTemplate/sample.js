/*
class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
};

export const errorMiddleware = (req, res, err, next) => {
	err.message = err.message || "Internal server error";
	err.statusCode = err.statusCode || 500;

	if (err.name === "CastError") {
		const message = `Resource not found. Invalid ${err.path}`;
		err = new ErrorHandler(message, 400)
	}
	if (err.name === "JsonWebTokenError") {
		const message = `Jwt token is invalid, try again.`;
		err = new ErrorHandler(message, 400)
	}
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		err = new ErrorHandler(message, 400)
	}
	if (err.name === "TokenExpiredError") {
		const message = `token is expired, try again.`;
		err = new ErrorHandler(message, 400)
	}

	// default option
	return res.status(err, statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler






// async habdler

export const asyncHandler = (func) => {
	return (req, res, next) => {
		Promise.resolve(func(req, res, err, next)).catch(next)
	}
}
*/