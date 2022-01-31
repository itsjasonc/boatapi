const mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: String,
	inLane: { type: mongoose.Schema.Types.ObjectId, ref: "Swimlane" }
});

module.exports = mongoose.model("Boat", schema);
