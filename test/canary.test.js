// var chai = require("chai");
// var chaiHttp = require("chai-http");
// var server = require("../server");
// var db = require("../models");
// var expect = chai.expect;

// // Setting up the chai http plugin
// chai.use(chaiHttp);

// var request;

// describe("GET /api/user", function() {
//   // Before each test begins, create a new request server for testing
//   // & delete all examples from the db
//   beforeEach(function() {
//     request = chai.request(server);
//     return db.sequelize.sync({ force: true });
//   });

//   it("should find all users", function(done) {
//     // Add some examples to the db to test with
//     db.User.bulkCreate([
//       { name: "First Example", email: "First Description", password: "test" },
//       { name: "Second Example", email: "Second Description", password: "test2" }
//     ]).then(function() {
//       // Request the route that returns all examples
//       request.get("/api/users").end(function(err, res) {
//         var responseStatus = res.status;
//         var responseBody = res.body;

//         // Run assertions on the response

//         expect(err).to.be.null;

//         expect(responseStatus).to.equal(200);

//         expect(responseBody)
//           .to.be.an("array")
//           .that.has.lengthOf(2);

//         expect(responseBody[0])
//           .to.be.an("object")
//           .that.includes({
//             name: "First Example",
//             email: "First Description",
//             password: "test"
//           });

//         expect(responseBody[1])
//           .to.be.an("object")
//           .that.includes({
//             name: "Second Example",
//             email: "Second Description",
//             password: "test2"
//           });

//         // The `done` function is used to end any asynchronous tests
//         done();
//       });
//     });
//   });
// });

// describe("POST /api/user", function() {
//   // Before each test begins, create a new request server for testing
//   // & delete all examples from the db
//   beforeEach(function() {
//     request = chai.request(server);
//     return db.sequelize.sync({ force: true });
//   });

//   it("should add user", function(done) {
//     // Create an object to send to the endpoint
//     var reqBody = {
//       name: "Example name",
//       email: "email1",
//       password: "password"
//     };

//     // POST the request body to the server
//     request
//       .post("/api/user")
//       .send(reqBody)
//       .end(function(err, res) {
//         var responseStatus = res.status;
//         var responseBody = res.body;

//         // Run assertions on the response

//         expect(err).to.be.null;

//         expect(responseStatus).to.equal(200);

//         expect(responseBody)
//           .to.be.an("object")
//           .that.includes(reqBody);

//         // The `done` function is used to end any asynchronous tests
//         done();
//       });
//   });
// });
