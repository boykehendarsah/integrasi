const db = require("../models");
const tblAnak = db.tblanak;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tblanak } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tblanak, totalPages, currentPage };
};

// Create and Save a new tblAnak
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a tblAnak
  const tblAnak = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save tblAnak in the database
  tblAnak.create(tblAnak)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tblAnak."
      });
    });
};

// Retrieve all tblanak from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nutblanak } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnutblanak = nutblanak ? nutblanak : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nutblanak : ");
   console.log(cnutblanak);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnutblanak != null ){
  condition = { nutblanak: { [Op.like]: `%${nutblanak}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnutblanak != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nutblanak: { [Op.like]: `%${cnutblanak}%` }} ]};     
} else if( cnama === null && cnik === null  && cnutblanak === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnutblanak === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnutblanak != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nutblanak: { [Op.like]: `%${cnutblanak}%` }} ]};     
} else if( cnama === null && cnik != null && cnutblanak != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nutblanak: { [Op.like]: `%${cnutblanak}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  tblAnak.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving tblanak."
      });
    });
};

// Retrieve all tblanak from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    tblAnak.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tblanak."
        });
      });
  };

// Find a single tblAnak with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  tblAnak.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving tblAnak with id=" + id
      });
    });
};

// Update a tblAnak by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  tblAnak.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "tblAnak was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update tblAnak with id=${id}. Maybe tblAnak was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating tblAnak with id=" + id
      });
    });
};

// Delete a tblAnak with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  tblAnak.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "tblAnak was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete tblAnak with id=${id}. Maybe tblAnak was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete tblAnak with id=" + id
      });
    });
};

// Delete all tblanak from the database.
exports.deleteAll = (req, res) => {
  tblAnak.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tblanak were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tblanak."
      });
    });
};

// find all published tblAnak
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  tblAnak.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tblanak."
      });
    });
};
