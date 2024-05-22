

module.exports = (sequelize, Sequelize) => {
const GENRES = sequelize.define('GENRES', {
  genres_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
      autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
 
});
return GENRES;
}

