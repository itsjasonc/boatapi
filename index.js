const express = require('express');
const mongoose = require('mongoose');
const createServer = require('./server');

// Connect to the database
mongoose.connect("mongodb://localhost:27017/boatapidb", { useNewUrlParser: true })
	.then(() => {
		const app = createServer();
		const port = 3000;

		app.listen(port, () => {
			console.log("BoatAPI has started.");
		});
	});
