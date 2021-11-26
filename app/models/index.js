const config = require("../config/db.config.js");

const Sequelize = require("sequelize");

//database wide options
var opts = {
  define:{
    freezeTableName: true
  }
};

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.tutorials = require("../models/tutorial.model.js")(sequelize, Sequelize);
db.sekolah = require("../models/sekolah.model.js")(sequelize, Sequelize);
db.ptk = require("../models/ptk.model.js")(sequelize, Sequelize);
db.rwypendidikanformal = require("../models/rwypendidikanformal.model.js")(sequelize, Sequelize);
db.rwykerja = require("../models/rwykerja.model.js")(sequelize, Sequelize);
db.rwyfungsional = require("../models/rwyfungsional.model.js")(sequelize, Sequelize);
db.rwysertifikasi = require("../models/rwysertifikasi.model.js")(sequelize, Sequelize);
db.rwystruktural = require("../models/rwystruktural.model.js")(sequelize, Sequelize);
db.rwygajiberkala = require("../models/rwygajiberkala.model.js")(sequelize, Sequelize);
db.tblanak = require("../models/tblanak.model.js")(sequelize, Sequelize);
db.rwykepangkatan = require("../models/rwykepangkatan.model.js")(sequelize, Sequelize);
db.mstpangkatgolongan = require("../models/mstpangkatgolongan.model.js")(sequelize, Sequelize);
db.mstagama = require("../models/mstagama.model.js")(sequelize, Sequelize);

/*
db.rwykepangkatan.hasMany(db.mstpangkatgolongan, { as: "rwykepangkatan" });
db.mstpangkatgolongan.belongsTo(db.rwykepangkatan, {
  foreignKey: "pangkat_golongan_id",
  as: "rwy_kepangkatan",
});

db.mstpangkatgolongan.hasMany(db.rwykepangkatan, { as: "rwykepangkatan" });
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan, {
  foreignKey: "pangkat_golongan_id",
  as: "mstPangkatGolongan",
});

db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

Team.hasMany(Player, {
  foreignKey: 'clubId'
});
Player.belongsTo(Team);

db.mstpangkatgolongan.hasOne(db.rwykepangkatan);
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan, {
  foreignKey: {
    name: 'fk_golonganid'
  }
});

db.mstpangkatgolongan.hasMany(db.rwykepangkatan, { 
  foreignKey: "pangkat_golongan_id"
});
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan);


db.mstpangkatgolongan.hasMany(db.rwykepangkatan, { 
  foreignKey: "pangkat_golongan_id"
});
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan);



db.mstpangkatgolongan.hasMany(db.rwykepangkatan, { 
  foreignKey: "pangkat_golongan_id"
});
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan);


db.mstpangkatgolongan.hasMany(db.rwykepangkatan, { 
  foreignKey: "pangkat_golongan_id"
});
db.rwykepangkatan.belongsTo(db.mstpangkatgolongan);

db.ptk.hasMany(db.rwypendidikanformal, { as: "rwypendidikanformal" });
db.rwypendidikanformal.belongsTo(db.ptk, {
  foreignKey: "ptk_id",
  as: "ptk",
});

*/

//db.mstpangkatgolongan.associate = function(models) {
  db.mstpangkatgolongan.hasMany(db.rwykepangkatan, {
    foreignKey: 'pangkat_golongan_id'
  });
//};

//db.rwykepangkatan.associate = function(models) {
  db.rwykepangkatan.belongsTo(db.mstpangkatgolongan, {
    foreignKey: 'pangkat_golongan_id'
  }); 
//};
// -------------------------------------------------------------------

db.ptk.hasMany(db.rwykepangkatan, {
  foreignKey: 'ptk_id'
});
//};

//db.rwykepangkatan.associate = function(models) {
db.rwykepangkatan.belongsTo(db.ptk, {
  foreignKey: 'ptk_id'
}); 

// -------------------------------------------------------------------

db.mstagama.hasMany(db.ptk, {
  foreignKey: 'agama_id'
}); 

db.ptk.belongsTo(db.mstagama, {
  foreignKey: 'agama_id'
});



// -------------------------------------------------------------------

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator", "superadmin"];

module.exports = db;