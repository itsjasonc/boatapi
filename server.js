const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware');

function createServer() {
	const app = express();
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors());

	// API routes
	app.use("/api", require('./routes'));

	// Middleware
	app.use(errorHandler);

	return app;
}

module.exports = createServer;
