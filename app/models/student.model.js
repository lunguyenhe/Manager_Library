// const sequelize = require("../index");
// const { DataTypes, DATE } = require("sequelize");
// Define a model
module.exports = (sequelize, Sequelize) => {
const STUDENTS = sequelize.define("STUDENTS", {
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
    validate: {
      isEmail: true,
    },
  },
  password_salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  birth_date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isAfter: "1970-01-01",
      customValidator(value) {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, "01", "01");
        if (value > eighteenYearsAgo) {
          throw new Error("Students must be 18 years or older.");
        }
      },
    },
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [10],
    },
  },
  refresh_token: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  refresh_token_expiry_time: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});
return STUDENTS;
}
