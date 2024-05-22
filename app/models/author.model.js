
module.exports = (sequelize, Sequelize) => {
const AUTHORS = sequelize.define('AUTHORS', {
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
      autoIncrement: true,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  birth_date:{
   type:Sequelize.DATE,
   allowNull:false,
   
  }
 ,
 death_date:{
    type:Sequelize.DATE,
    allowNull:true,
    validate: {
      min:1970,
      max:new Date().getFullYear()
    },
    
   },
   biography:{
    type:Sequelize.STRING,
    allowNull:false,
   }
});
return AUTHORS;
}

