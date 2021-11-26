const db = require("../models");
const rwyFungsional = db.rwyfungsional;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwyfungsional } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwyfungsional, totalPages, currentPage };
};

// Create and Save a new rwyFungsional
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyFungsional
  const rwyFungsional = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyFungsional in the database
  rwyFungsional.create(rwyFungsional)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyFungsional."
      });
    });
};

// Retrieve all rwyfungsional from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwyfungsional } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwyfungsional = nurwyfungsional ? nurwyfungsional : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwyfungsional : ");
   console.log(cnurwyfungsional);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwyfungsional != null ){
  condition = { nurwyfungsional: { [Op.like]: `%${nurwyfungsional}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwyfungsional != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwyfungsional: { [Op.like]: `%${cnurwyfungsional}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwyfungsional === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwyfungsional === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwyfungsional != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwyfungsional: { [Op.like]: `%${cnurwyfungsional}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwyfungsional != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwyfungsional: { [Op.like]: `%${cnurwyfungsional}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwyFungsional.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving rwyfungsional."
      });
    });
};

// Retrieve all rwyfungsional from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyFungsional.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwyfungsional."
        });
      });
  };

// Find a single rwyFungsional with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyFungsional.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyFungsional with id=" + id
      });
    });
};

// Update a rwyFungsional by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyFungsional.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyFungsional was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyFungsional with id=${id}. Maybe rwyFungsional was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyFungsional with id=" + id
      });
    });
};

// Delete a rwyFungsional with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyFungsional.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyFungsional was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyFungsional with id=${id}. Maybe rwyFungsional was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyFungsional with id=" + id
      });
    });
};

// Delete all rwyfungsional from the database.
exports.deleteAll = (req, res) => {
  rwyFungsional.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwyfungsional were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwyfungsional."
      });
    });
};

// find all published rwyFungsional
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyFungsional.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwyfungsional."
      });
    });
};
