const express = require('express');
const routes = require('./routes');
const cors = require('cors');

function createServer() {
	const app = express();
	app.use(express.json());
	app.use(cors());
	app.use("/api", routes);

	return app;
}

module.exports = createServer;
