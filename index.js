const express = require('express');
const mongoose = require('mongoose');
const createServer = require('./server');
const db = require('./db');

const url = db.data.url + "BoatDB" + db.data.params;

const port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true })
	.then(() => {
		// After a successful connection, we create the Express server
		const app = createServer();

		// We listen on the supplied port
		app.listen(port, () => {
			console.log("BoatAPI has started on port " + port);
		});
	});
