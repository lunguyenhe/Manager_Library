const db = require("../models");
const FeedBack = db.FEEDBACK;
const Op = db.Sequelize.Op;
const { FeedBackSchema } = require('../validators/feedback.validator');
const passwordUtils = require('../utils/password.utils');
exports.create = (req, res) => {
  const { error, value } = FeedBackSchema.validate(req.body);
  
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const borrow = {
    id:req.body.id,
    content:req.body.content,
    stars:req.body.stars,
  };
console.log(borrow);
  
FeedBack.create(borrow)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the borrowed."
      });
    });
};


exports.findAll = (req, res) => {
  const content = req.query.content;
  var condition = content ? { content: { [Op.like]: `%${content}%` } } : null;

  FeedBack.findAll({ where: condition })
    .then(data => {
     

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving FeedBack."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  FeedBack.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find feedback with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving feedback with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const feedback=  FeedBack.findByPk(req.body.id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find feedback with id=${id}.`
      });
    }
  })
  const feedbackUpdate = {
    id:req.body.id,

    content:req.body.content?req.body.content:feedback.content,
    stars:req.body.stars?req.body.stars:feedback.stars,
  };

  console.log(feedbackUpdate);
  FeedBack.update(feedbackUpdate, {
    where: { id: feedbackUpdate.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "feedback was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update feedback with id=${id}. Maybe FeedBack was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating feedback with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  FeedBack.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "feedback was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete feedback with id=${id}. Maybe Borrowedbook was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete FeedBack with id=" + id
      });
    });
};


