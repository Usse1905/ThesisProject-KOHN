const { Sequelize, DataTypes } = require("sequelize");
const Cfg = require('./configDb.js');
const projectdb = {}

const connection = new Sequelize(Cfg.database, Cfg.user, Cfg.password, {
    host: Cfg.host,
    dialect: Cfg.dialect
})

projectdb.Admins = require("../Model/ModelAdmins.js")(connection,DataTypes);
projectdb.Users = require("../Model/ModelUsers.js")(connection,DataTypes);
projectdb.Companies = require("../Model/ModelCompanies.js")(connection,DataTypes);
projectdb.Cars = require("../Model/ModelCars.js")(connection,DataTypes);

Object.keys(projectdb).forEach(model => {
    if (projectdb[model].associate) {
      projectdb[model].associate(projectdb); 
    }
  });

  connection.sync({ alter : true })  

  async function testConnection() {
    try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  }

  testConnection()

  projectdb.Sequelize = Sequelize;
  projectdb.connection = connection
module.exports = connection