module.exports = (sequelize, Sequelize) => {
  const rwyStruktural = sequelize.define("rwy_struktural", {
    riwayat_struktural_id: {
      type: Sequelize.UUID
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    jabatan_ptk_id: {
      type: Sequelize.INTEGER
    },
    sk_struktural: {
        type: Sequelize.STRING
    },
    tmt_jabatan: {
          type: Sequelize.DATE
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
    tableName: 'rwy_struktural'
    
  });

  return rwyStruktural;
};
