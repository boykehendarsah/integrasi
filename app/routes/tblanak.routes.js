const { authJwt } = require("../middleware");
const controller = require("../controllers/tblanak.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new tblAnak
  app.post("/v1/tblanak",  [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  // Retrieve all tblAnak
  app.get("/v1/tblanak", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

 // Retrieve a single tblAnak with id
 app.get("/v1/tblanak/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

  // Update a tblAnak with id
 app.put("/v1/tblanak/:id", controller.update);

 // Delete a tblAnak with id
 app.delete("/v1/tblanak/:id", controller.delete);

 // Create a new tblAnak
 app.delete("/v1/tblanak/", controller.deleteAll);
};