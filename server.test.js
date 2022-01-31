const mongoose = require('mongoose');
const createServer = require('./server');
const Swimlane = require('./models/Swimlane');
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
