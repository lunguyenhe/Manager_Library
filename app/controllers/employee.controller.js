const db = require("../models");
const Employees = db.EMPLOYEES;
const Op = db.Sequelize.Op;
const { employeeSchema } = require('../validators/employee.validator');
const passwordUtils = require('../utils/password.utils');
exports.create = (req, res) => {
  const { error, value } = employeeSchema.validate(req.body);
  const password = req.body.password;

  const hashedPassword = passwordUtils.hashPassword(password);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  


  const employee = {
    full_name:req.body.full_name,
    email:req.body.email,
    password_salt:hashedPassword.salt,
    password_hash:hashedPassword.hash,
    birth_date:req.body.birth_date,
    phone_number:req.body.phone_number,

  };
console.log(employee);
  
Employees.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee."
      });
    });
};


exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

  Employees.findAll({ where: condition })
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
        message: err.message || "Some error occurred while retrieving employee."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Employees.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving employee with id=" + id
      });
    });
};


exports.update = (req, res) => {
  const employee=  Employees.findByPk(req.body.employee_id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find employee with id=${id}.`
      });
    }
  })
  const employeeUpdate = {
    employee_id:req.body.employee_id,
    full_name:req.body.full_name ?req.body.full_name:employee.full_name,
    email:req.body.email?req.body.email:employee.email,
    birth_date:req.body.birth_date?req.body.birth_date:employee.birth_date,
    phone_number:req.body.phone_number?req.body.phone_number:employee.phone_number,

  };
  const { error, value } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  
  console.log(employeeUpdate);
  Employees.update(employeeUpdate, {
    where: { employee_id: employeeUpdate.employee_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};
 
exports.delete = (req, res) => {
  const id = req.params.id;

  Employees.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};


