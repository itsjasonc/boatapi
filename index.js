const express = require('express');
const mongoose = require('mongoose');
const createServer = require('./server');
const db = require('./db');

const url = db.data.url + "BoatDB" + db.data.params;

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true })
	.then(() => {
		const app = createServer();
		const port = 3001;

		app.listen(port, () => {
			console.log("BoatAPI has started.");
		});
	});
