const { filterObj } = require("../includes/filterObject");
const { sequelize } = require("../models");
const db = require("../models");
const Ptk = db.ptk;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: ptk } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, ptk, totalPages, currentPage };
};

// Create and Save a new Ptk
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Ptk
  const Ptk = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Ptk in the database
  Ptk.create(Ptk)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ptk."
      });
    });
};

// Retrieve all ptk from the database.
exports.findAll = (req, res) => {
  const allowedWhere =['ptk_id','nama','nik','nip','nuptk'];
  const filteredWhere = filterObj(req.query, allowedWhere );

  const { page, size, nama, nik, nuptk } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnuptk = nuptk ? nuptk : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nuptk : ");
   console.log(cnuptk);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnuptk != null ){
  condition = { nuptk: { [Op.like]: `%${nuptk}%` }};
  nquery = nquery + 1 ; 
}

/*
if( cnama != null && cnik != null && cnuptk != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nuptk: { [Op.like]: `%${cnuptk}%` }} ]};     
} else if( cnama === null && cnik === null  && cnuptk === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnuptk === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnuptk != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nuptk: { [Op.like]: `%${cnuptk}%` }} ]};     
} else if( cnama === null && cnik != null && cnuptk != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nuptk: { [Op.like]: `%${cnuptk}%` }} ]};     
} 
*/
   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  Ptk.findAndCountAll({ 
      where: filteredWhere,
      limit, 
      offset,
      
      include: [{
        model: db.rwykepangkatan,
        required: false,
        attributes: {
          include:[
            'nomor_sk',
            'tanggal_sk',
            //['mstpangkatgolongan.kode', 'tes']
            [sequelize.literal('(select a.kode from ref.pangkat_golongan a where a.pangkat_golongan_id = rwy_kepangkatans.pangkat_golongan_id limit 1)'), 'kode_pangkat']
        ]},
        include:[
          {
            model: db.mstpangkatgolongan,
            attributes: ['kode']
          }
        ]
      },
      {
        model: db.mstagama,
        required: false,
        attributes: ['nama']
      }
    ],
  raw: false
  })
    .then(data => {
      var tmpData = [];
      // if (data.count > 0){
      //   for (const[key, value] of Object.entries(data.rows)){
      //     if(value.agama != undefined){
      //       value['nama_agama'] = value.agama.nama;
      //     }
      //     tmpData.push(value)
      //   }
      // }
      const response = getPagingData(data, page, limit);
    //   if (response.ptk.length != 0 != null) {
    //     Object.keys(response.ptk).forEach(function (field) {
    //         if (response.ptk['agama'] != null) {
    //           response.ptk['agama']  = response.ptk.agama.nama;
    //         }
    //     })
    // }
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ptk."
      });
    });
};

// Retrieve all ptk from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    Ptk.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ptk."
        });
      });
  };

// Find a single Ptk with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ptk.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Ptk with id=" + id
      });
    });
};

// Update a Ptk by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ptk.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ptk was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Ptk with id=${id}. Maybe Ptk was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ptk with id=" + id
      });
    });
};

// Delete a Ptk with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ptk.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ptk was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Ptk with id=${id}. Maybe Ptk was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Ptk with id=" + id
      });
    });
};

// Delete all ptk from the database.
exports.deleteAll = (req, res) => {
  Ptk.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ptk were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ptk."
      });
    });
};

// find all published Ptk
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Ptk.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ptk."
      });
    });
};
