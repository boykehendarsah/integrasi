module.exports = (sequelize, Sequelize) => {
  const Sekolah = sequelize.define("sekolah", {
    sekolah_id: {
      type: Sequelize.UUID
    },
    nama: {
      type: Sequelize.STRING
    },
    nama_nomenklatur: {
        type: Sequelize.STRING
    },
    nss: {
        type: Sequelize.STRING
    },
    npsn: {
        type: Sequelize.STRING
    } 
},{
    tableName: 'sekolah'
    
  });

  return Sekolah;
};
