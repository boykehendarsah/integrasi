const db = require("../models");
const rwyKerja = db.rwykerja;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwykerja } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwykerja, totalPages, currentPage };
};

// Create and Save a new rwyKerja
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyKerja
  const rwyKerja = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyKerja in the database
  rwyKerja.create(rwyKerja)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyKerja."
      });
    });
};

// Retrieve all rwykerja from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwykerja } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwykerja = nurwykerja ? nurwykerja : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwykerja : ");
   console.log(cnurwykerja);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwykerja != null ){
  condition = { nurwykerja: { [Op.like]: `%${nurwykerja}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwykerja != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwykerja: { [Op.like]: `%${cnurwykerja}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwykerja === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwykerja === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwykerja != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwykerja: { [Op.like]: `%${cnurwykerja}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwykerja != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwykerja: { [Op.like]: `%${cnurwykerja}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwyKerja.findAndCountAll({ 
      where: condition, 
      limit, 
      offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwykerja."
      });
    });
};

// Retrieve all rwykerja from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyKerja.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwykerja."
        });
      });
  };

// Find a single rwyKerja with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyKerja.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyKerja with id=" + id
      });
    });
};

// Update a rwyKerja by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyKerja.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyKerja was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyKerja with id=${id}. Maybe rwyKerja was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyKerja with id=" + id
      });
    });
};

// Delete a rwyKerja with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyKerja.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyKerja was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyKerja with id=${id}. Maybe rwyKerja was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyKerja with id=" + id
      });
    });
};

// Delete all rwykerja from the database.
exports.deleteAll = (req, res) => {
  rwyKerja.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwykerja were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwykerja."
      });
    });
};

// find all published rwyKerja
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyKerja.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwykerja."
      });
    });
};
