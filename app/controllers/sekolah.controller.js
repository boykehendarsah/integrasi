const db = require("../models");
const Sekolah = db.sekolah;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: sekolah } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, sekolah, totalPages, currentPage };
};

// Create and Save a new Sekolah
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sekolah
  const Sekolah = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Sekolah in the database
  Sekolah.create(Sekolah)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sekolah."
      });
    });
};

// Retrieve all sekolah from the database.
exports.findAll = (req, res) => {
  // const { page, size, nama, npsn } = req.query;
  const { page, size, nama, npsn } = req.query;
  /*
  var condition = nama ? 
    {[Op.and]:[{ nama: { [Op.like]: `%${nama}%` },npsn: { [Op.eq]: `${npsn}` } } ]}
    : null;
*/
   var condition = null;
   var rumah = 'bandung';
   var cnama = nama ? nama : null;
   var cnpsn = npsn ? npsn : null;

   console.log("nama : ");
   console.log(cnama);
   console.log("npsn : ");
   console.log(cnpsn);

   
  
   if( cnama != null && cnpsn != null ){
        var condition = {[Op.and]:[{ nama: { [Op.like]: `%${nama}%` },npsn: { [Op.eq]: `${npsn}` } } ]};     
   } else if( cnama === null && cnpsn === null ) {
        var condition = null;
   } else  if( cnama === null || cnpsn != null ) {
    var condition = { npsn: { [Op.eq]: `${npsn}` }} ;
} else if( cnama != null || cnpsn === null ) {
     var condition = { nama: { [Op.like]: `%${nama}%` }} ;
} 

   console.log(condition);
   
  //var condition = npsn ? { npsn: { [Op.eq]: `${npsn}` } } : null;
/*
  Post.findAll({
    where: {
      authorId: 12,
      status: 'active'
    }
  });

  {
  [Op.or]: [
    {
      title: {
        [Op.like]: 'Boat%'
      }
    },
    {
      description: {
        [Op.like]: '%boat%'
      }
    }
  ]
}
  */
  // SELECT * FROM post WHERE authorId = 12 AND status = 'active';

  const { limit, offset } = getPagination(page, size);

  Sekolah.findAndCountAll({ 
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
          err.message || "Some error occurred while retrieving sekolah."
      });
    });
};

// Retrieve all sekolah from the database.
exports.npsnfindAll = (req, res) => {
    const { page, size, npsn } = req.query;
    var condition = npsn ? { npsn: { [Op.like]: `%${npsn}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    Sekolah.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sekolah."
        });
      });
  };

// Find a single Sekolah with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sekolah.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sekolah with id=" + id
      });
    });
};

// Update a Sekolah by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sekolah.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sekolah was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sekolah with id=${id}. Maybe Sekolah was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sekolah with id=" + id
      });
    });
};

// Delete a Sekolah with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sekolah.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sekolah was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sekolah with id=${id}. Maybe Sekolah was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sekolah with id=" + id
      });
    });
};

// Delete all sekolah from the database.
exports.deleteAll = (req, res) => {
  Sekolah.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} sekolah were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sekolah."
      });
    });
};

// find all published Sekolah
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Sekolah.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sekolah."
      });
    });
};
