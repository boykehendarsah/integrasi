const { authJwt } = require("../middleware");
const controller = require("../controllers/rwykerja.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyKerja
  app.post("/v1/rwykerja",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyKerja
  app.get("/v1/rwykerja", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyKerja with id
 app.get("/v1/rwykerja/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyKerja with id
 app.put("/v1/rwykerja/:id", controller.update);

 // Delete a rwyKerja with id
 app.delete("/v1/rwykerja/:id", controller.delete);

 // Create a new rwyKerja
 app.delete("/v1/rwykerja/", controller.deleteAll);
};