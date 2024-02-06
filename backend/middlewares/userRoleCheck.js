import ErrorHandler from "./error.js";

// additional functionality added for user role check.
export const userRoleCheck = (allowedRole) => (req, res, next) => {
	const { role } = req.user;
	if (role !== allowedRole) {
		return next(new ErrorHandler(`${role} can't access this resource`, 400));
	}
	next();
}