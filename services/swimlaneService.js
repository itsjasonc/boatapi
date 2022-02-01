const { Swimlane } = require('../models');

// A helper function for building params
function buildParams(queryParams) {
	// The parameters we're looking for
	const { name } = queryParams;

	const filter = {};
	if (name) filter["name"] = name;
	return { filter };
}

module.exports = {
	// Create document
	save: async function (data) {
		// Property spread the data if it exists
		const swimlane = new Swimlane({ ...data });
		await swimlane.save();
		return swimlane;
	},

	// Read many documents
	find: async function (queryParams) {
		const { filter } = buildParams(queryParams);
		return await Swimlane.find(filter);
	},

	// Read one document
	findOne: async function (id) {
		return await Swimlane.findOne({ _id: id });
	},

	// Updates one document
	update: async function (id, data) {
		return await Swimlane.findOneAndUpdate({ _id: id }, data, { returnOriginal: false });
	},

	// Deletes one document (delete is reserved keyword)
	destroy: async function (id) {
		return await Swimlane.findOneAndDelete({ _id: id });
	},
};
