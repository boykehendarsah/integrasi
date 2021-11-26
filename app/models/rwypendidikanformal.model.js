module.exports = (sequelize, Sequelize) => {
  const rwyPendidikanFormal = sequelize.define("rwy_pend_formal", {
    riwayat_pendidikan_formal_id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    bidang_studi_id: {
      type: Sequelize.INTEGER
    },
    jenjang_pendidikan_id: {
        type: Sequelize.INTEGER
    },
    gelar_akademik_id: {
        type: Sequelize.INTEGER
    },
    satuan_pendidikan_formal: {
        type: Sequelize.STRING
    },
    fakultas: {
        type: Sequelize.STRING
    },
    kependidikan: {
          type: Sequelize.INTEGER
    },
    tahun_masuk: {
          type: Sequelize.INTEGER
    },
    tahun_lulus: {
        type: Sequelize.INTEGER
    },
    nim: {
          type: Sequelize.STRING
    } ,
    status_kuliah: {
        type: Sequelize.INTEGER
    },
    semester: {
        type: Sequelize.INTEGER
    },
    ipk: {
        type: Sequelize.INTEGER
    },
    prodi: {
        type: Sequelize.UUID
    },
    id_reg_pd: {
        type: Sequelize.UUID
    }
},{
    tableName: 'rwy_pend_formal'
    
  });

  return rwyPendidikanFormal;
};
