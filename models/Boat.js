const mongoose = require('mongoose');

// Standard schema using default settings
const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	inLane: { type: mongoose.Schema.Types.ObjectId, ref: "Swimlane" }
});

// Build the model
const Boat = mongoose.model("Boat", schema);

// Export the model
module.exports = Boat;
