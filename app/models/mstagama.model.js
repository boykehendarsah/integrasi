module.exports = (sequelize, Sequelize) => {
  const mstAgama = sequelize.define("agama", {
    agama_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    kode: {
        type: Sequelize.STRING
    },
    nama: {
      type: Sequelize.STRING
    }
},{
    schema: "ref",
    tableName: "agama",
    indexes: [
      {
        name: "agama_id_unik",
        unique: true,
        fields: [
          { name: "agama_id" },
        ]
      },
    ]
    
  });

  return mstAgama;
};
