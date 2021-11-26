module.exports = (sequelize, Sequelize) => {
  const rwyGajiBerkala = sequelize.define("riwayat_gaji_berkala", {
    riwayat_gaji_berkala_id: {
      type: Sequelize.UUID
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
    tmt_kgb: {
          type: Sequelize.DATE
    },
    masa_kerja_tahun: {
        type: Sequelize.INTEGER
    },
    masa_kerja_bulan: {
        type: Sequelize.INTEGER
    },
    gaji_pokok: {
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
    tableName: 'riwayat_gaji_berkala'
    
  });

  return rwyGajiBerkala;
};
