// TO HANDLE THE ASYNC ERROR AUTOMATICALY. it is a higher order funtion which takes a another function in thair argument and return a promises.

export const catchAsyncError = (theFunction) => {
	return (req, res, next) => {
		Promise.resolve(theFunction(req, res, next)).catch(next);
	}
}


/*
// another way
const asynchandler = (fn) => async (req, res, next) => {
	try {
		await fn(req, res, next)
	} catch (err) {
		res.status(err.code || 500).json({
			success: false,
			message: err.message
		})
	}
}
export { asynchandler };
*/