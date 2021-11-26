const { authJwt } = require("../middleware");
const controller = require("../controllers/tutorial.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.get("/api/test/all", controller.allAccess);

  // Create a new Tutorial
  //app.post("/api/tutorials", tutorials.create);


  // Retrieve all Tutorials
  app.get("/api/tutorials", controller.findAll);


  // Retrieve all published Tutorials
  app.get("/api/tutorials/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/api/tutorials/:id", tutorials.findOne);

  // Update a Tutorial with id
  app.put("/api/tutorials/:id", tutorials.update);

  // Delete a Tutorial with id
  app.delete("/api/tutorials/:id", tutorials.delete);

  // Create a new Tutorial
  app.delete("/api/tutorials/", tutorials.deleteAll);

  //app.use("/api/tutorials", router);


};