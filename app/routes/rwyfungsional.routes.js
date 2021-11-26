const { authJwt } = require("../middleware");
const controller = require("../controllers/rwyfungsional.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyFungsional
  app.post("/v1/rwyfungsional",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyFungsional
  app.get("/v1/rwyfungsional", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyFungsional with id
 app.get("/v1/rwyfungsional/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyFungsional with id
 app.put("/v1/rwyfungsional/:id", controller.update);

 // Delete a rwyFungsional with id
 app.delete("/v1/rwyfungsional/:id", controller.delete);

 // Create a new rwyFungsional
 app.delete("/v1/rwyfungsional/", controller.deleteAll);
};