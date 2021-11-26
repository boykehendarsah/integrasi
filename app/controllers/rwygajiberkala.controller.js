const db = require("../models");
const rwyGajiBerkala = db.rwygajiberkala;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwygajiberkala } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwygajiberkala, totalPages, currentPage };
};

// Create and Save a new rwyGajiBerkala
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyGajiBerkala
  const rwyGajiBerkala = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyGajiBerkala in the database
  rwyGajiBerkala.create(rwyGajiBerkala)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyGajiBerkala."
      });
    });
};

// Retrieve all rwygajiberkala from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwygajiberkala } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwygajiberkala = nurwygajiberkala ? nurwygajiberkala : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwygajiberkala : ");
   console.log(cnurwygajiberkala);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwygajiberkala != null ){
  condition = { nurwygajiberkala: { [Op.like]: `%${nurwygajiberkala}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwygajiberkala != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwygajiberkala: { [Op.like]: `%${cnurwygajiberkala}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwygajiberkala === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwygajiberkala === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwygajiberkala != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwygajiberkala: { [Op.like]: `%${cnurwygajiberkala}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwygajiberkala != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwygajiberkala: { [Op.like]: `%${cnurwygajiberkala}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwyGajiBerkala.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving rwygajiberkala."
      });
    });
};

// Retrieve all rwygajiberkala from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyGajiBerkala.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwygajiberkala."
        });
      });
  };

// Find a single rwyGajiBerkala with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyGajiBerkala.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyGajiBerkala with id=" + id
      });
    });
};

// Update a rwyGajiBerkala by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyGajiBerkala.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyGajiBerkala was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyGajiBerkala with id=${id}. Maybe rwyGajiBerkala was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyGajiBerkala with id=" + id
      });
    });
};

// Delete a rwyGajiBerkala with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyGajiBerkala.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyGajiBerkala was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyGajiBerkala with id=${id}. Maybe rwyGajiBerkala was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyGajiBerkala with id=" + id
      });
    });
};

// Delete all rwygajiberkala from the database.
exports.deleteAll = (req, res) => {
  rwyGajiBerkala.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwygajiberkala were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwygajiberkala."
      });
    });
};

// find all published rwyGajiBerkala
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyGajiBerkala.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwygajiberkala."
      });
    });
};
