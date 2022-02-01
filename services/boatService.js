const { Boat } = require('../models');

// A helper function for building params
function buildParams(queryParams) {
	// The parameters we're looking for
	const { name, inLane } = queryParams;

	const filter = {};
	if (name) filter["name"] = name;
	if (inLane) filter["inLane"] = inLane;
	return { filter };
}

module.exports = {
	// Create document
	save: async function (data) {
		// Property spread the data if it exists
		const boat = new Boat({ ...data });
		await boat.save();
		return boat;
	},

	// Read many documents
	find: async function (queryParams) {
		const { filter } = buildParams(queryParams);
		return await Boat.find(filter);
	},

	// Read one document
	findOne: async function (id) {
		return await Boat.findOne({ _id: id });
	},

	// Updates one document
	update: async function (id, data) {
		return await Boat.findOneAndUpdate({ _id: id }, data, { returnOriginal: false });
	},

	// Deletes one document (delete is reserved keyword)
	destroy: async function (id) {
		return await Boat.findOneAndDelete({ _id: id });
	},
};
