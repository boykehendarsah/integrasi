const { authJwt } = require("../middleware");
const controller = require("../controllers/sekolah.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Sekolah
  app.post("/v1/sekolah",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all sekolah
  app.get("/v1/sekolah", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single Sekolah with id
 app.get("/v1/sekolah/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

 // Retrieve a single Sekolah with sekolah_id
 app.get("/v1/sekolah/npsn/:npsn", controller.npsnfindAll);

 // Update a Sekolah with id
 app.put("/v1/sekolah/:id", controller.update);

 // Delete a Sekolah with id
 app.delete("/v1/sekolah/:id", controller.delete);

 // Create a new Sekolah
 app.delete("/v1/sekolah/", controller.deleteAll);
};