const { authJwt } = require("../middleware");
const controller = require("../controllers/ptk.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Ptk
  app.post("/v1/ptk",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all ptk
  app.get("/v1/ptk", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single Ptk with id
 app.get("/v1/ptk/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a Ptk with id
 app.put("/v1/ptk/:id", controller.update);

 // Delete a Ptk with id
 app.delete("/v1/ptk/:id", controller.delete);

 // Create a new Ptk
 app.delete("/v1/ptk/", controller.deleteAll);
};