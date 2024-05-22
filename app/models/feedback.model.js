module.exports = (sequelize, Sequelize) => {
const FEEDBACK = sequelize.define('FEEDBACK', {
  
  feedback_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  
          autoIncrement: true,
    
  },
  content:{
   type:Sequelize.DATE,
   allowNull:false,
   
  }
  
 ,
 stars:{
    type:Sequelize.INTEGER,
    allowNull:false,
    
   },

});
return FEEDBACK;
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
//module.exports=FEEDBACK;

