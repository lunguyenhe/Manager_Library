const dbConfig = require("../config/database.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.AUTHOR = require("./author.model.js")(sequelize, Sequelize);
db.BOOKS = require("./book.model.js")(sequelize, Sequelize);
db.EMPLOYEES = require("./employee.model.js")(sequelize, Sequelize);
//db.FEEDBACK = require("./feedback.model.js")(sequelize, Sequelize);
db.GENRES = require("./genres.model.js")(sequelize, Sequelize);
db.STUDENTS = require("./student.model.js")(sequelize, Sequelize);
db.BOOK_IMGAGE = require("./book_image.model.js")(sequelize, Sequelize);
db.BORROWED_BOOKS = require("./borrowed_books.model.js")(sequelize, Sequelize);
db.BORROWED_BOOKS.belongsTo(db.STUDENTS, { foreignKey: 'student_id' });
db.BORROWED_BOOKS.belongsTo(db.BOOKS, { foreignKey: 'book_id' });
db.BORROWED_BOOKS.belongsTo(db.EMPLOYEES, { foreignKey: 'employee_id' });
db.BOOKS.belongsTo(db.GENRES, { foreignKey: 'genres_id' });
db.BOOKS.belongsTo(db.AUTHOR, { foreignKey: 'author_id' });
db.BOOK_IMGAGE.belongsTo(db.BOOKS, { foreignKey: 'book_id' });
//db.BORROWED_BOOKS.belongsTo(db.FEEDBACK, { foreignKey: 'feedback_id' });
//db.BORROWED_BOOKS.belongsTo(db.FEEDBACK, { foreignKey: 'id' });
module.exports = db;