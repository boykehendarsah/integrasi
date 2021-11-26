const { sequelize } = require("../models");
const db = require("../models");
const rwyPendidikanFormal = db.rwypendidikanformal;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rwypendidikanformal } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rwypendidikanformal, totalPages, currentPage };
};

// Create and Save a new rwyPendidikanFormal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a rwyPendidikanFormal
  const rwyPendidikanFormal = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save rwyPendidikanFormal in the database
  rwyPendidikanFormal.create(rwyPendidikanFormal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the rwyPendidikanFormal."
      });
    });
};

// Retrieve all rwypendidikanformal from the database.
exports.findAll = (req, res) => {

  const { page, size, nama, nik, nurwypendidikanformal } = req.query;

   var condition = null;
   var cnama  = nama ? nama : null;
   var cnik  = nik ? nik : null;
   var cnurwypendidikanformal = nurwypendidikanformal ? nurwypendidikanformal : null;
   var ctrue1 = "true, ";
   var ctrue2 = "true ";
   var nquery = 0;

   console.log("nama : ");
   console.log(cnama);
   console.log("nik : ");
   console.log(cnik);
   console.log("nurwypendidikanformal : ");
   console.log(cnurwypendidikanformal);

if( cnama != null ){
    condition = { nama: { [Op.like]: `%${nama}%` }};
    nquery = nquery + 1 ;   
} 

if( cnik != null ){
  condition = { nik: { [Op.like]: `%${nik}%` }};
  nquery = nquery + 1 ; 
}

if( cnurwypendidikanformal != null ){
  condition = { nurwypendidikanformal: { [Op.like]: `%${nurwypendidikanformal}%` }};
  nquery = nquery + 1 ; 
}

if( cnama != null && cnik != null && cnurwypendidikanformal != null ){
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` },nurwypendidikanformal: { [Op.like]: `%${cnurwypendidikanformal}%` }} ]};     
} else if( cnama === null && cnik === null  && cnurwypendidikanformal === null ) {
  var condition = null;
} else  if( nquery === 1 ) {
  
} else if( cnama != null && cnik != null && cnurwypendidikanformal === null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nik: { [Op.like]: `%${cnik}%` }} ]};                   
} else if( cnama != null && cnik === null && cnurwypendidikanformal != null ) {
  var condition = {[Op.and]:[{ nama: { [Op.like]: `%${cnama}%` },nurwypendidikanformal: { [Op.like]: `%${cnurwypendidikanformal}%` }} ]};     
} else if( cnama === null && cnik != null && cnurwypendidikanformal != null ) {
  var condition = {[Op.and]:[{ nik: { [Op.like]: `%${cnik}` },nurwypendidikanformal: { [Op.like]: `%${cnurwypendidikanformal}%` }} ]};     
} 

   console.log(condition);

  const { limit, offset } = getPagination(page, size);

  // rwyPendidikanFormal.findAndCountAll({ 
    sequelize.query('select * from v_riwayat_pendidikan', {   
  replacement:{},
  raw: false
    })
    .then(data => {
      //const response = getPagingData(data, page, limit);
      res.send({
        data: data[0]
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwypendidikanformal."
      });
    });
};

// Retrieve all rwypendidikanformal from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    rwyPendidikanFormal.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving rwypendidikanformal."
        });
      });
  };

// Find a single rwyPendidikanFormal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  rwyPendidikanFormal.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving rwyPendidikanFormal with id=" + id
      });
    });
};

// Update a rwyPendidikanFormal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  rwyPendidikanFormal.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyPendidikanFormal was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update rwyPendidikanFormal with id=${id}. Maybe rwyPendidikanFormal was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating rwyPendidikanFormal with id=" + id
      });
    });
};

// Delete a rwyPendidikanFormal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  rwyPendidikanFormal.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rwyPendidikanFormal was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rwyPendidikanFormal with id=${id}. Maybe rwyPendidikanFormal was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rwyPendidikanFormal with id=" + id
      });
    });
};

// Delete all rwypendidikanformal from the database.
exports.deleteAll = (req, res) => {
  rwyPendidikanFormal.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} rwypendidikanformal were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all rwypendidikanformal."
      });
    });
};

// find all published rwyPendidikanFormal
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  rwyPendidikanFormal.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rwypendidikanformal."
      });
    });
};
