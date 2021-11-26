const { authJwt } = require("../middleware");
const controller = require("../controllers/rwypendidikanformal.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyPendidikanFormal
  app.post("/v1/rwypendidikanformal",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyPendidikanFormal
  app.get("/v1/rwypendidikanformal", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyPendidikanFormal with id
 app.get("/v1/rwypendidikanformal/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyPendidikanFormal with id
 app.put("/v1/rwypendidikanformal/:id", controller.update);

 // Delete a rwyPendidikanFormal with id
 app.delete("/v1/rwypendidikanformal/:id", controller.delete);

 // Create a new rwyPendidikanFormal
 app.delete("/v1/rwypendidikanformal/", controller.deleteAll);
};