module.exports = (error, req, res, next) => {
	// TODO: Log this to a file
	console.log(error);
	res.status(error.status || 500);
	res.json({
		message: error.message || "Unknown error.",
		msg: error.msg,
		stack: error.stack,
	});
};
