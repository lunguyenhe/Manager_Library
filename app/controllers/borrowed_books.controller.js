const db = require("../models");
const Borrowedbook = db.BORROWED_BOOKS;
const Op = db.Sequelize.Op;
const { borrowedBookSchema } = require('../validators/borrowed_books.validator');
const passwordUtils = require('../utils/password.utils');
exports.create = (req, res) => {
  const { error, value } = borrowedBookSchema.validate(req.body);
  
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const borrow = {
    book_id:req.body.book_id,
    student_id:req.body.student_id,
    employee_id:req.body.employee_id,
    borrowed_date:req.body.borrowed_date,
    expected_return_date:req.body.expected_return_date,
    refresh_token:req.body.refresh_token,
    is_returned:false,

  };
console.log(borrow);
  
Borrowedbook.create(borrow)
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
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

  Borrowedbook.findAll({ where: condition })
    .then(data => {
      // Format the dates before sending the response
      const formattedData = data.map(s => ({
        ...s.toJSON(),
        birth_date: new Date(s.birth_date).toLocaleDateString()
      }));

      res.send(formattedData);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Borrowedbook."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Borrowedbook.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Borrowedbook with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Borrowedbook with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const borrow=  Borrowedbook.findByPk(req.body.id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Borrowedbook with id=${id}.`
      });
    }
  })
  const borrowUpdate = {
    id:req.body.id,
    book_id:req.body.book_id ?req.body.book_id:borrow.book_id,
    student_id:req.body.student_id?req.body.student_id:borrow.student_id,
    employee_id:req.body.employee_id?req.body.employee_id:borrow.employee_id,
    borrowed_date:req.body.borrowed_date?req.body.borrowed_date:borrow.borrowed_date,
    expected_return_date:req.body.expected_return_date?req.body.expected_return_date:borrow.expected_return_date,
    actual_return_date:req.body.actual_return_date?req.body.expected_return_date:borrow.actual_return_date,
    is_returned:req.body.is_returned?req.body.is_returned:borrow.is_returned,
  };

  console.log(borrowUpdate);
  Borrowedbook.update(borrowUpdate, {
    where: { id: borrowUpdate.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Borrowedbook was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Borrowedbook with id=${id}. Maybe Borrowedbook was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Borrowedbook with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  Borrowedbook.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Borrowedbook was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Borrowedbook with id=${id}. Maybe Borrowedbook was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Borrowedbook with id=" + id
      });
    });
};


