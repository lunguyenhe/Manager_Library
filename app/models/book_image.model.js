
module.exports = (sequelize, Sequelize) => {
    const BOOK_IMAGE = sequelize.define('BOOK_IMAGE', {

      book_image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
          autoIncrement: true,
      },
      book_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
    
    });
    return BOOK_IMAGE;
    }
    
    