const { swimlaneService } = require('../services');

// Swimlane controller for route handling

module.exports = {
	// Following CRUD
	
	// POST to /swimlane
	save: async function (req, res, next) {
		try {
			const swimlane = await swimlaneService.save(req.body);
			res.json(swimlane);
		} catch (err) {
			err.msg = "Failed to create resource.";
			next(err);
		}
	},

	// GET /swimlane
	find: async function (req, res, next) {
		try {
			const swimlanes = await swimlaneService.find({ ...req.query });
			res.json(swimlanes);
		} catch (err) {
			err.message = "Failed to retrieve resource.";
			next(err);
		}
	},

	// GET /swimlane/:id
	findOne: async function (req, res, next) {
		try {
			// Reading the id from the parameters
			const swimlane = await swimlaneService.findOne(req.params.id);
			if (swimlane == null) res.status(404).json("Resource not found.");
			else res.json(swimlane);
		} catch (err) {
			err.message = "Failed to retrieve resource.";
			next(err);
		}
	},

	// PATCH /swimlane/:id
	update: async function (req, res, next) {
		try {
			// Reading the id from the parameters, and updating from the body
			const swimlane = await swimlaneService.update(req.params.id, req.body);
			if (swimlane == null) res.status(404).json("Resource not found.");
			else res.json(swimlane);
		} catch (err) {
			err.message = "Failed to update resource.";
			next(err);
		}
	},

	// DELETE /swimlane/:id
	destroy: async function (req, res, next) {
		try {
			// Reading the id from the parameters
			const swimlane = await swimlaneService.destroy(req.params.id);
			if (swimlane == null) res.status(404).json("Resource not found.");
			else res.status(204).json("Resource was deleted.");
		} catch (err) {
			err.message = "Failed to update resource.";
			next(err);
		}
	},
};
