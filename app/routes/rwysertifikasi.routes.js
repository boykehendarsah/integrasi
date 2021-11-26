const { authJwt } = require("../middleware");
const controller = require("../controllers/rwysertifikasi.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwySertifikasi
  app.post("/v1/rwysertifikasi",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwySertifikasi
  app.get("/v1/rwysertifikasi", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwySertifikasi with id
 app.get("/v1/rwysertifikasi/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwySertifikasi with id
 app.put("/v1/rwysertifikasi/:id", controller.update);

 // Delete a rwySertifikasi with id
 app.delete("/v1/rwysertifikasi/:id", controller.delete);

 // Create a new rwySertifikasi
 app.delete("/v1/rwysertifikasi/", controller.deleteAll);
};