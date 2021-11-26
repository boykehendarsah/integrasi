const { sequelize } = require("../models");
const db = require("../models");
const rwyKepangkatan = db.rwykepangkatan;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwykepangkatan } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwykepangkatan, totalPages, currentPage };
};

// Create and Save a new rwyKepangkatan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyKepangkatan
  const rwyKepangkatan = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyKepangkatan in the database
  rwyKepangkatan.create(rwyKepangkatan)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyKepangkatan."
      });
    });
};

// Retrieve all rwykepangkatan from the database.
exports.findAll = (req, res) => {

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

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwyKepangkatan.findAndCountAll({
    attributes:{
      include:[
        [sequelize.literal('pangkat_golongan.kode'), 'kode_pangkat']
      ]
    },
      where: condition, 
      limit, 
      offset,
      
      include: [{
        model: db.mstpangkatgolongan,
        attributes: ['kode', 'nama']
      }] 
    })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwykepangkatan."
      });
    });
};

// Retrieve all rwykepangkatan from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyKepangkatan.findAndCountAll({ where: condition, limit, offset,
      include: [{
        model: mstPangkatGolongan,
        where: { fk_golonganid: db.Sequelize.col('pangkat_golongan.pangkat_golongan_id') },
        attributes: ['code', 'name', 'details']
      },{
        model: ptk,
        where: { fk_golonganid: db.Sequelize.col('pangkat_golongan.pangkat_golongan_id') },
        attributes: ['code', 'name', 'details']
      },
    ]
     })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwykepangkatan."
        });
      });
  };

// Find a single rwyKepangkatan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyKepangkatan.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyKepangkatan with id=" + id
      });
    });
};

// Update a rwyKepangkatan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyKepangkatan.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyKepangkatan was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyKepangkatan with id=${id}. Maybe rwyKepangkatan was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyKepangkatan with id=" + id
      });
    });
};

// Delete a rwyKepangkatan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyKepangkatan.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyKepangkatan was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyKepangkatan with id=${id}. Maybe rwyKepangkatan was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyKepangkatan with id=" + id
      });
    });
};

// Delete all rwykepangkatan from the database.
exports.deleteAll = (req, res) => {
  rwyKepangkatan.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwykepangkatan were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwykepangkatan."
      });
    });
};

// find all published rwyKepangkatan
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyKepangkatan.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwykepangkatan."
      });
    });
};
