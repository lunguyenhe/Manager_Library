const db = require("../models");
const Genres = db.GENRES;
const Op = db.Sequelize.Op;
const { genresSchema } = require('../validators/genres.validator');

exports.create = (req, res) => {
  const { error, value } = genresSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const genres = {
    name: req.body.name,

  };
console.log(genres);
  
Genres.create(genres)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the genres."
      });
    });
};


exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

  Genres.findAll({ where: condition })
    .then(data => {
      // Format the dates before sending the response
      const formattedData = data.map(gen => ({
        ...gen.toJSON(),
        birth_date: new Date(gen.birth_date).toLocaleDateString(),
        death_date: gen.death_date ? new Date(gen.death_date).toLocaleDateString() : null
      }));

      res.send(formattedData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Genres."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Genres.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Genres with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Genres with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const genres = {
    genres_id:req.body.genres_id,
     name:req.body.name
  };
  console.log(genres);
  Genres.update(genres, {
    where: { genres_id: genres.genres_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Genres was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Genres with id=${id}. Maybe Genres was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Genres with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  Genres.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Genres was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Genres with id=${id}. Maybe Genres was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Genres with id=" + id
      });
    });
};


