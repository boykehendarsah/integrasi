module.exports = (sequelize, Sequelize) => {
  const rwyFungsional = sequelize.define("rwy_fungsional", {
    riwayat_fungsional_id: {
      type: Sequelize.UUID
    },
    ptk_id: {
        type: Sequelize.UUID
    },
    jabatan_fungsional_id: {
      type: Sequelize.INTEGER
    },
    sk_jabfung: {
        type: Sequelize.STRING
    },
    tmt_jabatan: {
          type: Sequelize.DATE
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
    tableName: 'rwy_fungsional'
    
  });

  return rwyFungsional;
};
