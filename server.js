const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import các routes

require("./app/routes/genres.routes")(app);
require("./app/routes/author.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/employeed.routes")(app);
require("./app/routes/borrowed_books.routes")(app);
// Cấu hình Swagger
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Manager Library Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  
  apis: ["./app/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Sử dụng CORS
app.use(cors(corsOptions));

// Định dạng các request có content-type là application/json
app.use(express.json());

// Định dạng các request có content-type là application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route đơn giản
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Manager Library application." });
});

// Set port và lắng nghe các request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Đồng bộ hóa cơ sở dữ liệu
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
