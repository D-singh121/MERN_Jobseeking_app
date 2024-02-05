// TO HANDLE THE ASYNC ERROR AUTOMATICALY. it is a higher order funtion which takes a another function in thair argument and return a promises.

export const catchAsyncError = (theFunction) => {
	return (req, res, next) => {
		Promise.resolve(theFunction(req, res, next)).catch(next);
	}
}
