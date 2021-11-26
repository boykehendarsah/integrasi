const db = require("../models");
const rwySertifikasi = db.rwysertifikasi;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwysertifikasi } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwysertifikasi, totalPages, currentPage };
};

// Create and Save a new rwySertifikasi
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwySertifikasi
  const rwySertifikasi = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwySertifikasi in the database
  rwySertifikasi.create(rwySertifikasi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwySertifikasi."
      });
    });
};

// Retrieve all rwysertifikasi from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwysertifikasi } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwysertifikasi = nurwysertifikasi ? nurwysertifikasi : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwysertifikasi : ");
   console.log(cnurwysertifikasi);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwysertifikasi != null ){
  condition = { nurwysertifikasi: { [Op.like]: `%${nurwysertifikasi}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwysertifikasi != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwysertifikasi: { [Op.like]: `%${cnurwysertifikasi}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwysertifikasi === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwysertifikasi === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwysertifikasi != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwysertifikasi: { [Op.like]: `%${cnurwysertifikasi}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwysertifikasi != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwysertifikasi: { [Op.like]: `%${cnurwysertifikasi}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  rwySertifikasi.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving rwysertifikasi."
      });
    });
};

// Retrieve all rwysertifikasi from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwySertifikasi.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwysertifikasi."
        });
      });
  };

// Find a single rwySertifikasi with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwySertifikasi.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwySertifikasi with id=" + id
      });
    });
};

// Update a rwySertifikasi by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwySertifikasi.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwySertifikasi was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwySertifikasi with id=${id}. Maybe rwySertifikasi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwySertifikasi with id=" + id
      });
    });
};

// Delete a rwySertifikasi with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwySertifikasi.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwySertifikasi was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwySertifikasi with id=${id}. Maybe rwySertifikasi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwySertifikasi with id=" + id
      });
    });
};

// Delete all rwysertifikasi from the database.
exports.deleteAll = (req, res) => {
  rwySertifikasi.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwysertifikasi were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwysertifikasi."
      });
    });
};

// find all published rwySertifikasi
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwySertifikasi.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwysertifikasi."
      });
    });
};
