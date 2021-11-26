const { authJwt } = require("../middleware");
const controller = require("../controllers/rwygajiberkala.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyGajiBerkala
  app.post("/v1/rwygajiberkala",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyGajiBerkala
  app.get("/v1/rwygajiberkala", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyGajiBerkala with id
 app.get("/v1/rwygajiberkala/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyGajiBerkala with id
 app.put("/v1/rwygajiberkala/:id", controller.update);

 // Delete a rwyGajiBerkala with id
 app.delete("/v1/rwygajiberkala/:id", controller.delete);

 // Create a new rwyGajiBerkala
 app.delete("/v1/rwygajiberkala/", controller.deleteAll);
};