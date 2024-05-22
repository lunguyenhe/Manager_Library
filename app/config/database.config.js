 module.exports = {
      HOST: "localhost",
      USER: "sa",
      PASSWORD: "123456789",
      DB: "manage_library",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    };
    