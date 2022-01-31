const mongoose = require('mongoose');
const createServer = require('./server');
const Swimlane = require('./models/Swimlane');
const Boat = require('./models/Boat');
const request = require('supertest');


beforeEach((done) => {
	mongoose.connect(
		"mongodb://localhost:27017/boatapidb",
		{ useNewUrlParser: true },
		() => done()
	)
});

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done());
	});
});

const app = createServer();




/* We begin testing the API here */

// Getting all Swimlanes
test("GET /api/swimlane", async() => {
	const swimlane = await Swimlane.create({
		name: "Swimlane 1"
	});

	await request(app)
		.get("/api/swimlane")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check the response data
			expect(response.body[0]._id).toBe(swimlane.id);
			expect(response.body[0].name).toBe(swimlane.name);
		});
});

// Get a single swimlane
test("GET /api/swimlane/:id", async() => {
	const swimlane = await Swimlane.create({
		name: "Swimlane 1"
	});

	await request(app)
		.get("/api/swimlane/" + swimlane.id)
		.expect(200)
		.then((response) => {
			// Check the response data
			expect(response.body._id).toBe(swimlane.id);
			expect(response.body.name).toBe(swimlane.name);
		});
});

// Create a single swimlane
test("POST /api/swimlane", async() => {
	const data = {
		name: "Swimlane 1"
	};

	await request(app)
		.post("/api/swimlane")
		.send(data)
		.expect(200)
		.then(async(response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.name).toBe(data.name);

			// Check the database
			const swimlane = await Swimlane.findOne({ _id: response.body._id });
			expect(swimlane).toBeTruthy();
			expect(swimlane.name).toBe(data.name);
		});
});

// Update a single swimlane
test("PATCH /api/swimlane/:id", async() => {
	const swimlane = await Swimlane.create({
		name: "Swimlane 1"
	});

	const data = {
		name: "Swimlane UPDATED"
	};

	await request(app)
		.patch("/api/swimlane/" + swimlane.id)
		.send(data)
		.expect(200)
		.then(async(response) => {
			// Check the response
			expect(response.body._id).toBe(swimlane.id);
			expect(response.body.name).toBe(escape(data.name));

			// Check the database
			const updatedSwimlane = await Swimlane.findOne({ _id: response.body._id });
			expect(updatedSwimlane).toBeTruthy();
			// Testing against the escaped version because we sanitize the string before putting it in the database
			expect(updatedSwimlane.name).toBe(escape(data.name));
		});
});

// DELETE a single swimlane
test("DELETE /api/swimlane/:id", async() => {
	const swimlane = await Swimlane.create({
		name: "Swimlane 1"
	});

	await request(app)
		.delete("/api/swimlane/" + swimlane.id)
		.expect(204)
		.then(async () => {
			// We shouldn't be able to find the swimlane
			expect(await Swimlane.findOne({ _id: swimlane.id })).toBeFalsy();
		});
});

// Getting all Boats
test("GET /api/boat", async() => {
	const boat = await Boat.create({
		name: "Boat 1"
	});

	await request(app)
		.get("/api/boat")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check the response data
			expect(response.body[0]._id).toBe(boat.id);
			expect(response.body[0].name).toBe(boat.name);
		});
});

// Get a single boat
test("GET /api/boat/:id", async() => {
	const boat = await Boat.create({
		name: "Boat 1"
	});

	await request(app)
		.get("/api/boat/" + boat.id)
		.expect(200)
		.then((response) => {
			// Check the response data
			expect(response.body._id).toBe(boat.id);
			expect(response.body.name).toBe(boat.name);
		});
});

// Create a single boat
test("POST /api/boat", async() => {
	const data = {
		name: "Boat 1"
	};

	await request(app)
		.post("/api/boat")
		.send(data)
		.expect(200)
		.then(async(response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.name).toBe(data.name);

			// Check the database
			const boat = await Boat.findOne({ _id: response.body._id });
			expect(boat).toBeTruthy();
			expect(boat.name).toBe(data.name);
		});
});

// Update a single boat
test("PATCH /api/boat/:id", async() => {
	const swimlaneOne = await Swimlane.create({
		name: "Swimlane 1"
	});
	const swimlaneTwo = await Swimlane.create({
		name: "Swimlane 2"
	});

	// We put the boat in the first swimlane
	const boat = await Boat.create({
		name: "Boat 1",
		inLane: swimlaneOne.id
	});

	const data = {
		name: "Boat UPDATED",
		// Then we move it into the second swimlane
		inLane: swimlaneTwo.id
	};

	await request(app)
		.patch("/api/boat/" + boat.id)
		.send(data)
		.expect(200)
		.then(async(response) => {
			// Check the response
			expect(response.body._id).toBe(boat.id);
			expect(response.body.name).toBe(escape(data.name));
			expect(response.body.inLane).toBe(escape(data.inLane));

			// Check the database
			const updatedBoat = await Boat.findOne({ _id: response.body._id });
			expect(updatedBoat).toBeTruthy();
			// Testing against the escaped version because we sanitize the string before putting it in the database
			expect(updatedBoat.name).toBe(escape(data.name));
			expect(updatedBoat.inLane.toString()).toBe(escape(data.inLane));
		});
});

// DELETE a single boat
test("DELETE /api/boat/:id", async() => {
	const boat = await Boat.create({
		name: "Boat 1"
	});

	await request(app)
		.delete("/api/boat/" + boat.id)
		.expect(204)
		.then(async () => {
			// We shouldn't be able to find the swimlane
			expect(await Boat.findOne({ _id: boat.id })).toBeFalsy();
		});
});
