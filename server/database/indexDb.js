const mysql = require("mysql2")
const mysqlCfg = require('./configDb.js')
const connection = mysql.createConnection(mysqlCfg)

connection.connect((error)=>{ error ? console.error(error):console.log("DB connected!")})

module.exports = connection