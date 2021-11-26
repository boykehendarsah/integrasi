const db = require("../models");
const mstPangkatGolongan = db.mstpangkatgolongan;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: mstpangkatgolongan } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, mstpangkatgolongan, totalPages, currentPage };
};

// Create and Save a new mstPangkatGolongan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a mstPangkatGolongan
  const mstPangkatGolongan = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save mstPangkatGolongan in the database
  mstPangkatGolongan.create(mstPangkatGolongan)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the mstPangkatGolongan."
      });
    });
};

// Retrieve all mstpangkatgolongan from the database.
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

  mstPangkatGolongan.findAndCountAll({ 
      where: condition, 
      limit, 
      offset,
      include: [{
        model: db.rwykepangkatan
      }] 
    })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mstpangkatgolongan."
      });
    });
};

// Retrieve all mstpangkatgolongan from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    mstPangkatGolongan.findAndCountAll({ where: condition, limit, offset,
      include: [{
        model: mstPangkatGolongan,
        
        attributes: ['code', 'name', 'details']
      }]
     })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving mstpangkatgolongan."
        });
      });
  };

// Find a single mstPangkatGolongan with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  mstPangkatGolongan.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving mstPangkatGolongan with id=" + id
      });
    });
};

// Update a mstPangkatGolongan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  mstPangkatGolongan.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "mstPangkatGolongan was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update mstPangkatGolongan with id=${id}. Maybe mstPangkatGolongan was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating mstPangkatGolongan with id=" + id
      });
    });
};

// Delete a mstPangkatGolongan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  mstPangkatGolongan.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "mstPangkatGolongan was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete mstPangkatGolongan with id=${id}. Maybe mstPangkatGolongan was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete mstPangkatGolongan with id=" + id
      });
    });
};

// Delete all mstpangkatgolongan from the database.
exports.deleteAll = (req, res) => {
  mstPangkatGolongan.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} mstpangkatgolongan were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all mstpangkatgolongan."
      });
    });
};

// find all published mstPangkatGolongan
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  mstPangkatGolongan.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mstpangkatgolongan."
      });
    });
};
