const { boatService } = require('../services');

// Boat controller for route handling

module.exports = {
	// Following CRUD
	
	// POST to /boat
	save: async function (req, res, next) {
		try {
			const boat = await boatService.save(req.body);
			res.json(boat);
		} catch (err) {
			err.msg = "Failed to create resource.";
			next(err);
		}
	},

	// GET /boat
	find: async function (req, res, next) {
		try {
			const boats = await boatService.find({ ...req.query });
			res.json(boats);
		} catch (err) {
			err.message = "Failed to retrieve resource.";
			next(err);
		}
	},

	// GET /boat/:id
	findOne: async function (req, res, next) {
		try {
			// Reading the id from the parameters
			const boat = await boatService.findOne(req.params.id);
			if (boat == null) res.status(404).json("Resource not found.");
			else res.json(boat);
		} catch (err) {
			err.message = "Failed to retrieve resource.";
			next(err);
		}
	},

	// PATCH /boat/:id
	update: async function (req, res, next) {
		try {
			// Reading the id from the parameters, and updating from the body
			const boat = await boatService.update(req.params.id, req.body);
			if (boat == null) res.status(404).json("Resource not found.");
			else res.json(boat);
		} catch (err) {
			err.message = "Failed to update resource.";
			next(err);
		}
	},

	// DELETE /boat/:id
	destroy: async function (req, res, next) {
		try {
			// Reading the id from the parameters
			const boat = await boatService.destroy(req.params.id);
			if (boat == null) res.status(404).json("Resource not found.");
			else res.status(204).json("Resource was deleted.");
		} catch (err) {
			err.message = "Failed to update resource.";
			next(err);
		}
	},
};
