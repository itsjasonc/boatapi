const express = require('express');
const Swimlane = require('./models/Swimlane');
const router = express.Router();

// Get all swimlanes
router.get("/swimlane", async(req, res) => {
	const swimlanes = await Swimlane.find()
	res.send(swimlanes);
});

// Create a swimlane
router.post("/swimlane", async(req, res) => {
	const swimlane = new Swimlane({
		name: req.body.name
	});

	await swimlane.save();
	res.send(swimlane);
});

// Get an individual swimlane
router.get("/swimlane/:id", async(req, res) => {
	try {
		const swimlane = await Swimlane.findOne({ _id: req.params.id });
		res.send(swimlane);
	} catch {
		res.status(404);
		res.send({ error: "Swimlane doesn't exist." });
	}
});

// Update an individual swimlane
router.patch("/swimlane/:id", async(req, res) => {
	try {
		const swimlane = await Swimlane.findOne({ _id: req.params.id });

		if (req.body.name) {
			swimlane.name = escape(req.body.name);
		}

		await swimlane.save();
		res.send(swimlane);
	} catch {
		res.status(404);
		res.send({ error: "Swimlane doesn't exist." });
	}
});

// Delete an individual swimlane
router.delete("/swimlane/:id", async(req, res) => {
	try {
		await Swimlane.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Swimlane doesn't exist." });
	}
});

module.exports = router;
