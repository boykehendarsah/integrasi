module.exports = (sequelize, Sequelize) => {
  const Ptk = sequelize.define("ptk", {
    ptk_id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    nama: {
      type: Sequelize.STRING
    },
    nip: {
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
      nik: {
        type: Sequelize.STRING
      },
      no_kk: {
          type: Sequelize.STRING
      },
      nuptk: {
          type: Sequelize.STRING
      },
      nuks: {
          type: Sequelize.STRING
      } ,

      status_kepegawaian_id: {
        type: Sequelize.INTEGER
    },
    jenis_ptk_id: {
        type: Sequelize.INTEGER
    },
    pengawas_bidang_studi_id: {
        type: Sequelize.INTEGER
      },
      agama_id: {
        type: Sequelize.INTEGER
      },
      alamat_jalan: {
          type: Sequelize.STRING
      },
      rt: {
          type: Sequelize.INTEGER
      },
      rw: {
          type: Sequelize.INTEGER
      } 
},{
    tableName: 'ptk'
    
  });

  return Ptk;
};
