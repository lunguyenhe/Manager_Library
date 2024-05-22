const db = require("../models");
const Students = db.STUDENTS;
const Op = db.Sequelize.Op;
const { studentSchema } = require('../validators/student.validator');
const passwordUtils = require('../utils/password.utils');
exports.create = (req, res) => {
  const { error, value } = studentSchema.validate(req.body);
  const password = req.body.password;

  const hashedPassword = passwordUtils.hashPassword(password);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const student = {
    full_name:req.body.full_name,
    email:req.body.email,
    password_salt:hashedPassword.salt,
    password_hash:hashedPassword.hash,
    birth_date:req.body.birth_date,
    phone_number:req.body.phone_number,
    refresh_token:req.body.refresh_token,
    refresh_token_expiry_time:req.body.refresh_token_expiry_time,

  };
console.log(student);
  
Students.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student."
      });
    });
};


exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

  Students.findAll({ where: condition })
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
        message: err.message || "Some error occurred while retrieving student."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Students.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Students with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Students with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const student=  Students.findByPk(req.body.student_id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find student with id=${id}.`
      });
    }
  })
  const studentUpdate = {
    student_id:req.body.student_id,
    full_name:req.body.full_name ?req.body.full_name:student.full_name,
    email:req.body.email?req.body.email:student.email,
    birth_date:req.body.birth_date?req.body.birth_date:student.birth_date,
    phone_number:req.body.phone_number?req.body.phone_number:student.phone_number,

  };

  console.log(student);
  Students.update(student, {
    where: { student_id: student.student_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  Students.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Students was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Students with id=${id}. Maybe Students was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Students with id=" + id
      });
    });
};


