const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/belajar.routes')(app);
require('./app/routes/sekolah.routes')(app);
require('./app/routes/ptk.routes')(app);
require('./app/routes/rwypendidikanformal.routes')(app);
require('./app/routes/rwykerja.routes')(app);
require('./app/routes/rwykepangkatan.routes')(app);
require('./app/routes/rwyfungsional.routes')(app);
require('./app/routes/rwysertifikasi.routes')(app);
require('./app/routes/rwystruktural.routes')(app);
require('./app/routes/rwygajiberkala.routes')(app);
require('./app/routes/tblanak.routes')(app);
require('./app/routes/masterpangkat.routes')(app);

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API Integrasi - Dinas Pendidikan Provinsi Jawa Barat." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });

    Role.create({
      id: 4,
      name: "operator"
    });

    Role.create({
      id: 5,
      name: "supervisor"
    });
  }