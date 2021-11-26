const db = require("../models");
const rwyStruktural = db.rwystruktural;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwystruktural } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwystruktural, totalPages, currentPage };
};

// Create and Save a new rwyStruktural
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyStruktural
  const rwyStruktural = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyStruktural in the database
  rwyStruktural.create(rwyStruktural)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyStruktural."
      });
    });
};

// Retrieve all rwystruktural from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwystruktural } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwystruktural = nurwystruktural ? nurwystruktural : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwystruktural : ");
   console.log(cnurwystruktural);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwystruktural != null ){
  condition = { nurwystruktural: { [Op.like]: `%${nurwystruktural}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwystruktural != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwystruktural: { [Op.like]: `%${cnurwystruktural}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwystruktural === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwystruktural === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwystruktural != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwystruktural: { [Op.like]: `%${cnurwystruktural}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwystruktural != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwystruktural: { [Op.like]: `%${cnurwystruktural}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwyStruktural.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving rwystruktural."
      });
    });
};

// Retrieve all rwystruktural from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyStruktural.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwystruktural."
        });
      });
  };

// Find a single rwyStruktural with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyStruktural.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyStruktural with id=" + id
      });
    });
};

// Update a rwyStruktural by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyStruktural.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyStruktural was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyStruktural with id=${id}. Maybe rwyStruktural was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyStruktural with id=" + id
      });
    });
};

// Delete a rwyStruktural with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyStruktural.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyStruktural was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyStruktural with id=${id}. Maybe rwyStruktural was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyStruktural with id=" + id
      });
    });
};

// Delete all rwystruktural from the database.
exports.deleteAll = (req, res) => {
  rwyStruktural.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwystruktural were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwystruktural."
      });
    });
};

// find all published rwyStruktural
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyStruktural.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwystruktural."
      });
    });
};
