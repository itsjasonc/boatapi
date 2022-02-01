const express = require('express');
const Swimlane = require('./models/Swimlane');
const Boat = require('./models/Boat');
const router = express.Router();
// Sanitization
const ObjectId = require('mongoose').Types.ObjectId;

// Get all swimlanes
router.get("/swimlane", async(req, res) => {
	const swimlanes = await Swimlane.find()
	res.json(swimlanes);
});

// Create a swimlane
router.post("/swimlane", async(req, res) => {
	const swimlane = new Swimlane({
		name: req.body.name
	});

	await swimlane.save();
	res.json(swimlane);
});

// Get an individual swimlane
router.get("/swimlane/:id", async(req, res) => {
	try {
		const swimlane = await Swimlane.findOne({ _id: req.params.id });
		res.json(swimlane);
	} catch {
		res.status(404);
		res.json({ error: "Swimlane doesn't exist." });
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
		res.json(swimlane);
	} catch {
		res.status(404);
		res.json({ error: "Swimlane doesn't exist." });
	}
});

// Delete an individual swimlane
router.delete("/swimlane/:id", async(req, res) => {
	try {
		await Swimlane.deleteOne({ _id: req.params.id });
		res.status(204).json();
	} catch {
		res.status(404);
		res.json({ error: "Swimlane doesn't exist." });
	}
});

// Get all boats
router.get("/boat", async(req, res) => {
	const boats = await Boat.find()
	res.json(boats);
});

// Create a boat
router.post("/boat", async(req, res) => {
	const boat = new Boat({
		name: req.body.name
	});

	if (req.body.inLane && ObjectId.isValid(req.body.inLane)) {
		boat.inLane = new ObjectId(req.body.inLane);
	} else {
		const swimlane = await Swimlane.findOne();
		if (swimlane) {
			boat.inLane = swimlane._id;
		}
	}

	await boat.save();
	res.json(boat);
});

// Get an individual boat
router.get("/boat/:id", async(req, res) => {
	try {
		const boat = await Boat.findOne({ _id: req.params.id });
		res.json(boat);
	} catch {
		res.status(404);
		res.json({ error: "Boat doesn't exist." });
	}
});

// Update an individual boat
router.patch("/boat/:id", async(req, res) => {
	try {
		const boat = await Boat.findOne({ _id: req.params.id });

		if (req.body.name) {
			boat.name = escape(req.body.name);
		}

		if (req.body.inLane && ObjectId.isValid(req.body.inLane)) {
			boat.inLane = new ObjectId(req.body.inLane);
		}

		await boat.save();
		res.json(boat);
	} catch {
		res.status(404);
		res.json({ error: "Boat doesn't exist." });
	}
});

// Delete an individual boat
router.delete("/boat/:id", async(req, res) => {
	try {
		await Boat.deleteOne({ _id: req.params.id });
		res.status(204).json();
	} catch {
		res.status(404);
		res.json({ error: "Boat doesn't exist." });
	}
});

module.exports = router;
