const Sequelize = require("sequelize");
const sequelize = new Sequelize("monitor_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    supportBigNumbers: true,
    bigNumberStrings: true
  },

  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: "+08:00" //东八时区
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  sequelize
};
