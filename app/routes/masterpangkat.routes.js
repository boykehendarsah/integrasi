const { authJwt } = require("../middleware");
const controller = require("../controllers/masterpangkat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new rwyKepangkatan
  app.post("/v1/masterpangkat",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all rwyKepangkatan
  app.get("/v1/masterpangkat", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single rwyKepangkatan with id
 app.get("/v1/masterpangkat/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a rwyKepangkatan with id
 app.put("/v1/masterpangkat/:id", controller.update);

 // Delete a rwyKepangkatan with id
 app.delete("/v1/masterpangkat/:id", controller.delete);

 // Create a new rwyKepangkatan
 app.delete("/v1/masterpangkat/", controller.deleteAll);
};