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

	if (err.name === "CasteError") {
		
	}
}