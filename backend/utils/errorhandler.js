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