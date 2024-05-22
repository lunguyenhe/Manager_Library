module.exports = (sequelize, Sequelize) => {
// Define a model
const BOOKS = sequelize.define('BOOKS', {
  book_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
      autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
   
  },
  
  publishingyear:{
   type:Sequelize.INTEGER,
   allowNull:false,
   validate: {
    max:new Date().getFullYear()
  },
  }
 ,
 price:{
  type:Sequelize.DECIMAL,
  allowNull:false,
  validate: {
    min:1,
   
  },
 },
 genres_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
});
return BOOKS
}
// Synchronize the model with the database
// This function will delete all existing tables in the database
// async function syncDatabase() {
//   await sequelize.sync();
//   console.log('Database synchronized.');
// }
// // Example usage
// // recommended to be in controller file
// async function run() {

//   await syncDatabase();// remember to comment this after server runs ones.
//   // Create a new user
//   // const newUser = await BOOKS.create({
//   //   title: 'john_doe',
//   //   publishingyear: 2022,
//   //   price:200
//   // });
//   // console.log('New user created:', newUser.toJSON());
// }
// run();


