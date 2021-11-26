module.exports = (sequelize, Sequelize) => {
  const rwyKerja = sequelize.define("rwy_kerja", {
    rwy_kerja_id: {
      type: Sequelize.UUID
    },
    jenjang_pendidikan_id: {
      type: Sequelize.INTEGER
    },
    jenis_lembaga_id: {
        type: Sequelize.INTEGER
    },
    status_kepegawaian_id: {
        type: Sequelize.INTEGER
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    jenis_ptk_id: {
        type: Sequelize.INTEGER
    },
    lembaga_pengangkat: {
        type: Sequelize.STRING
    },
    no_sk_kerja: {
        type: Sequelize.STRING
    },
    tgl_sk_kerja: {
          type: Sequelize.DATE
    },
    tmt_kerja: {
        type: Sequelize.DATE
    },
    tst_kerja: {
        type: Sequelize.DATE
    },
    tempat_kerja: {
          type: Sequelize.STRING
    } ,
    ttd_sk_kerja: {
        type: Sequelize.STRING
    },
    mapel_diajarkan: {
        type: Sequelize.STRING
    }
},{
    tableName: 'rwy_kerja'
    
  });

  return rwyKerja;
};
