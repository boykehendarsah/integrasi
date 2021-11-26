const { authJwt } = require("../middleware");
const controller = require("../controllers/belajar.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Tutorial
  app.post("/api/tutorials",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all Tutorials
  app.get("/api/tutorials", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve all published Tutorials
 app.get("/api/tutorials/published", controller.findAllPublished);

 // Retrieve a single Tutorial with id
 app.get("/api/tutorials/:id", controller.findOne);

 // Update a Tutorial with id
 app.put("/api/tutorials/:id", controller.update);

 // Delete a Tutorial with id
 app.delete("/api/tutorials/:id", controller.delete);

 // Create a new Tutorial
 app.delete("/api/tutorials/", controller.deleteAll);
};