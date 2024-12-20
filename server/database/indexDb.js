
const { Sequelize, DataTypes } = require("sequelize");
const Cfg = require('./configDb.js');
const projectdb = {}

const connection = new Sequelize(Cfg.database, Cfg.user, Cfg.password, {
    host: Cfg.host,
    dialect: Cfg.dialect
})

projectdb.Users = require("../Model/ModelUsers.js")(connection,DataTypes);
projectdb.Companies = require("../Model/ModelCompanies.js")(connection,DataTypes);
projectdb.Cars = require("../Model/ModelCars.js")(connection,DataTypes);
projectdb.UserRequests = require("../Model/ModelUserRequests.js")(connection,DataTypes);
projectdb.Message = require("../Model/ModelMessages.js")(connection,DataTypes);


Object.keys(projectdb).forEach(model => {
    if (projectdb[model].associate) {
      projectdb[model].associate(projectdb); 
    }
  });

  
   // connection.sync({ alter : true })

  async function testConnection() {
    try {
    await connection.authenticate();
    console.log('database is succefully connected.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  }

  testConnection()

  projectdb.Sequelize = Sequelize;
  projectdb.connection = connection

module.exports = projectdb

