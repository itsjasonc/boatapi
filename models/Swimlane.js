const mongoose = require('mongoose');

// Standard schema using default settings
const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
});

// Virtual attribute so we can return the ID as a string
schema.virtual("id").get(function () {
	return this._id.toHexString()
});

// Build the model
const Swimlane = mongoose.model("Swimlane", schema);

// Export the model
module.exports = Swimlane;
