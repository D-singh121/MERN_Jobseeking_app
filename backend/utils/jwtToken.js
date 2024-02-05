// User successfully registered hone  ke baad hume  user ko directly login karwana hai na ki use login pe bhejna hai .
// User directly login hoga aur ek jwt token create hoga.
export const sendToken = (user, statusCode, res, message) => {
	const generatedToken = user.getJWTToken(); // comming from models page.
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	res.status(statusCode).cookie("generatedToken", generatedToken, options).json({
		success: true,
		user,
		message,
		generatedToken,
	});
};