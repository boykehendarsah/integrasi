module.exports = (sequelize, Sequelize) => {
  const rwySertifikasi = sequelize.define("rwy_sertifikasi", {
    riwayat_sertifikasi_id: {
      type: Sequelize.UUID
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    bidang_studi_id: {
      type: Sequelize.INTEGER
    },
    id_jenis_sertifikasi: {
        type: Sequelize.INTEGER
    },
    tahun_sertifikasi: {
          type: Sequelize.INTEGER
    },
    nomor_sertifikat: {
        type: Sequelize.STRING
    },
    nrg: {
        type: Sequelize.STRING
    },
    nomor_peserta: {
        type: Sequelize.STRING
    },
    asal_data: {
        type: Sequelize.STRING
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
    tableName: 'rwy_sertifikasi'
    
  });

  return rwySertifikasi;
};
