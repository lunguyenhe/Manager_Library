const db = require("../models");
const Author = db.AUTHOR;
const Op = db.Sequelize.Op;
const { authorSchema } = require('../validators/author.validator');

exports.create = (req, res) => {
  const { error, value } = authorSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const author = {
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    death_date: req.body.death_date ,
    biography:req.body.biography
  };
console.log(author);
  
  Author.create(author)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the author."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

  Author.findAll({ where: condition })
    .then(data => {
      // Format the dates before sending the response
      const formattedData = data.map(author => ({
        ...author.toJSON(),
        birth_date: new Date(author.birth_date).toLocaleDateString(),
        death_date: author.death_date ? new Date(author.death_date).toLocaleDateString() : null
      }));

      res.send(formattedData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving authors."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Author.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Author with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Author with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const author = {
    author_id:req.body.author_id,
    full_name: req.body.full_name,
    birth_date: req.body.birth_date,
    death_date: req.body.death_date ,
    biography:req.body.biography
  };
  console.log(author);
  Author.update(author, {
    where: { author_id: author.author_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Author was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Author with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  Author.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Author was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Author with id=" + id
      });
    });
};


