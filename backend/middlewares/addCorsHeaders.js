function addCorsHeaders(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT'); // Adjust methods
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
}

export default addCorsHeaders;