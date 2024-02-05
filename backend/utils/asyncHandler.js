// const asynchandler = (func) => { () => { } }  // higher order function.

// wrapper function of async work 
/*
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

//---------------- by Promises way ---------------//
/*
const asynchandler = (requestHandler) => {
	(req, res, next) => {
		Promise.resolve(requestHandler(req, res, next))
			.catch((err) => next(err))
	}
}
*/