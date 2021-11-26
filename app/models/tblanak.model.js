module.exports = (sequelize, Sequelize) => {
  const tblAnak = sequelize.define("anak", {
    anak_id: {
      type: Sequelize.UUID
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    status_anak_id: {
      type: Sequelize.INTEGER
    },
    jenjang_pendidikan_id: {
        type: Sequelize.INTEGER
    },
    nik: {
        type: Sequelize.STRING
    },
    nisn: {
        type: Sequelize.STRING
    },
    nama: {
        type: Sequelize.STRING
    },
    jenis_kelamin: {
        type: Sequelize.STRING
    },
    tempat_lahir: {
        type: Sequelize.STRING
    },
    tanggal_lahir: {
        type: Sequelize.DATE
  },
    tahun_masuk: {
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
    tableName: 'anak'
    
  });

  return tblAnak;
};
