//
class ErrorHandler extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

// creating error middleware
export const errorMiddleware = (err, req, res, next) => {
	err.message = err.message || "Internal server error";
	err.statusCode = err.statusCode || 500;

	if (err.name === "CastError") {
		const message = `Resource not found. Invalid ${err.path}`;
		err = new ErrorHandler(message, 400)
	}
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		err = new ErrorHandler(message, 400)
	}
	if (err.name === "JsonWebTokenError") {
		const message = `JWT token is Invalid , try Again. `;
		err = new ErrorHandler(message, 400)
	}
	if (err.name === "TokenExpiredError") {
		const message = `JWT token is expired , try Again.`;
		err = new ErrorHandler(message, 400)
	}

	return res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;



/*
class ErrorHandler extends Error {
	constructor(
		statusCode,
		message = "Something went wrong",
		errors = [],
		stack = ""
	) {
		super(message) // overriding the error error stack.
		this.statusCode = statusCode
		this.data = null
		this.message = message
		this.success = false;
		this.errors = errors

		// for future use only optional
		if(stack){
			this.stack = stack
		} else{
			Error.captureStackTrace(this, this.constructor)
		}

	}
}
*/