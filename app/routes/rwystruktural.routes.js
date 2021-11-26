const { authJwt } = require("../middleware");
const controller = require("../controllers/rwystruktural.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyStruktural
  app.post("/v1/rwystruktural",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyStruktural
  app.get("/v1/rwystruktural", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyStruktural with id
 app.get("/v1/rwystruktural/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyStruktural with id
 app.put("/v1/rwystruktural/:id", controller.update);

 // Delete a rwyStruktural with id
 app.delete("/v1/rwystruktural/:id", controller.delete);

 // Create a new rwyStruktural
 app.delete("/v1/rwystruktural/", controller.deleteAll);
};