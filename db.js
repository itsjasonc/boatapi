require('dotenv').config()

const url = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.bc2ay.mongodb.net/";
const params = "?retryWrites=true&w=majority";

exports.data = {
	url: url,
	params: params,
};
