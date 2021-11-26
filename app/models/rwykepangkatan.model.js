module.exports = (sequelize, Sequelize) => {
  const rwyKepangkatan = sequelize.define("rwy_kepangkatan", {
    riwayat_kepangkatan_id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    pangkat_golongan_id: {
      type: Sequelize.INTEGER
    },
    nomor_sk: {
        type: Sequelize.STRING
    },
    tanggal_sk: {
          type: Sequelize.DATE
    },
    tmt_pangkat: {
        type: Sequelize.DATE
    },
    masa_kerja_gol_tahun: {
        type: Sequelize.INTEGER
    },
    masa_kerja_gol_bulan: {
        type: Sequelize.INTEGER
    },
    create_date: {
        type: Sequelize.DATE
    },
    last_update: {
        type: Sequelize.DATE
    },
    soft_delete: {
        type: Sequelize.INTEGER
    },
    last_sync: {
          type: Sequelize.DATE
    },
    updater_id: {
        type: Sequelize.UUID
    }
},{
    schema: 'public',
    tableName: 'rwy_kepangkatan',
    indexes: [
        {
          name: "riwayat_pang_gol_fk",
          unique: false,
          fields: [
            { name: "pangkat_golongan_id" },
          ]
        }
      ]
    
  });

  return rwyKepangkatan;
};
