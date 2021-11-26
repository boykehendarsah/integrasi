module.exports = (sequelize, Sequelize) => {
  const mstPangkatGolongan = sequelize.define("pangkat_golongan", {
    pangkat_golongan_id: {
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
    tableName: "pangkat_golongan",
    indexes: [
      {
        name: "pangkat_golongan_id_unik",
        unique: true,
        fields: [
          { name: "pangkat_golongan_id" },
        ]
      },
    ]
    
  });

  return mstPangkatGolongan;
};
