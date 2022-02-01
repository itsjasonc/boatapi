const swimlaneRoutes = require('./swimlaneRoutes');
const boatRoutes = require('./boatRoutes');

// Express routes uses an array, so we export the routes as an array instead of the usual JSON Object
module.exports = [ swimlaneRoutes, boatRoutes ];
