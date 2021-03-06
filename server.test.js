const mongoose = require('mongoose');
const createServer = require('./server');
const { Swimlane, Boat } = require('./models');
const { swimlaneService, boatService } = require('./services');
const request = require('supertest');

const db = require('./db');

const url = db.data.url + "BoatDB-test" + db.data.params;

beforeAll(async() => {
	await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async() => {
	await mongoose.connection.close();
});

afterEach(async() => {
	await Swimlane.deleteMany();
	await Boat.deleteMany();
});

const app = createServer();


/* We begin testing the API here */

// Getting all Swimlanes
test("GET /api/swimlane", async() => {
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

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
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

	await request(app)
		.get("/api/swimlane/" + swimlane.id)
		.expect(200)
		.then((response) => {
			// Check the response data
			expect(response.body._id).toBe(swimlane.id);
			expect(response.body.name).toBe(swimlane.name);
		});
});

test("GET /api/swimlane/:id on ID that doesn't exist", async() => {
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

	// Using a valid ObjectId that doesn't actually exist.. hopefully
	await request(app)
		.get("/api/swimlane/" + "61f79b8f47de80b5546b8bff")
		.expect(404)
		.then((response) => {
			expect(response.body).toBe("Resource not found.");
		});
});

test("GET /api/swimlane/:id on ID that is not an ObjectId", async() => {
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

	// Using a valid ObjectId that doesn't actually exist.. hopefully
	await request(app)
		.get("/api/swimlane/" + "not_object_id")
		.expect(500)
		.then((response) => {
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
			const swimlane = await swimlaneService.findOne(response.body._id);
			expect(swimlane).toBeTruthy();
			expect(swimlane.name).toBe(data.name);
		});
});

// Update a single swimlane
test("PATCH /api/swimlane/:id", async() => {
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

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
			expect(response.body.name).toBe(data.name);

			// Check the database
			const updatedSwimlane = await Swimlane.findOne({ _id: response.body._id });
			expect(updatedSwimlane).toBeTruthy();
			expect(updatedSwimlane.name).toBe(data.name);
		});
});

// DELETE a single swimlane
test("DELETE /api/swimlane/:id", async() => {
	const swimlane = await swimlaneService.save({ name: "Swimlane 1" });

	await request(app)
		.delete("/api/swimlane/" + swimlane.id)
		.expect(204)
		.then(async () => {
			// We shouldn't be able to find the swimlane
			expect(await swimlaneService.findOne(swimlane.id)).toBeFalsy();
		});
});

// Getting all Boats
test("GET /api/boat", async() => {
	const boat = await boatService.save({ name: "Boat 1" });

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
	const boat = await boatService.save({ name: "Boat 1" });

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
			const boat = await boatService.findOne(response.body._id);
			expect(boat).toBeTruthy();
			expect(boat.name).toBe(data.name);
		});
});

// Update a single boat
test("PATCH /api/boat/:id", async() => {
	const swimlaneOne = await swimlaneService.save({ name: "Swimlane 1" });
	const swimlaneTwo = await swimlaneService.save({ name: "Swimlane 2" });

	// We put the boat in the first swimlane
	const boat = await boatService.save({ name: "Boat 1", inLane: swimlaneOne.id });

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
			expect(response.body.name).toBe(data.name);
			expect(response.body.inLane).toBe(data.inLane);

			// Check the database
			const updatedBoat = await boatService.findOne(response.body._id);
			expect(updatedBoat).toBeTruthy();
			expect(updatedBoat.name).toBe(data.name);
			expect(updatedBoat.inLane.toString()).toBe(data.inLane);
		});
});

// DELETE a single boat
test("DELETE /api/boat/:id", async() => {
	const boat = await boatService.save({ name: "Boat 1" });

	await request(app)
		.delete("/api/boat/" + boat.id)
		.expect(204)
		.then(async () => {
			// We shouldn't be able to find the swimlane
			expect(await boatService.findOne(boat.id)).toBeFalsy();
		});
});

