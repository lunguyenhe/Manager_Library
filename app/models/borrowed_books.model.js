

// const Student = require('./student.model'); //
// const Book = require('./book.model'); //
// const Employee = require('./employee.model'); 
// Define a model
module.exports = (sequelize, Sequelize) => {
const BORROWED_BOOKS  = sequelize.define('BORROWED_BOOKS', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
          autoIncrement: true,
      },
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,

  },
  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    
  },
  employee_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  borrowed_date:{
   type:Sequelize.DATE,
   allowNull:false,
  
  }
  
 ,
 expected_return_date: {
  type: Sequelize.DATE,
  allowNull: false,
},
actual_return_date: {
  type: Sequelize.DATE,
  allowNull: true,
},
is_returned: {
  type: Sequelize.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},
late_fee: {
  type: Sequelize.DECIMAL(10, 2), // Decimal type for storing currency values
  allowNull: true,
  defaultValue: 0, // Default value is 0
},
});
return BORROWED_BOOKS;
}
// BORROWED_BOOKS.belongsTo(Student, { foreignKey: 'student_id' });
// BORROWED_BOOKS.belongsTo(Book, { foreignKey: 'book_id' });
// BORROWED_BOOKS.belongsTo(Employee, { foreignKey: 'employee_id' });
// Synchronize the model with the database
// This function will delete all existing tables in the database
// async function syncDatabase() {
//     await sequelize.sync();
//     console.log("Database synchronized.");
//   }
//   async function run() {
//     await syncDatabase(); // remember to comment this after server runs ones.
//     // Create a new user
//     // const newUser = await BOOKS.create({
//     //   title: 'john_doe',
//     //   publishingyear: 2022,
//     //   price:200
//     // });
//     // console.log('New user created:', newUser.toJSON());
//   }
//   run();
  
// module.exports = BORROWED_BOOKS;
