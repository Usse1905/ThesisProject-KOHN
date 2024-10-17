const {Sequelize,DataTypes}=require("sequelize")
const config=require('./configDb.js')
const connection= new Sequelize(config.database,config.user,config.password,
    {
        host:config.host,
        dialect:"mysql"
    })

    const DB={}
    DB.Sequelize=Sequelize;
    DB.connection=connection;
    DB.compagnies=require("../Model/compagnies.js")(connection,DataTypes)
    DB.Cars=require("../Model/Cars.js")(connection,DataTypes)

    // connection.sync({alter:true})
    connection.authenticate()
    .then(()=>{console.log("database is succefully connected");
    })
    .catch((error)=>{console.log(error)});

    module.exports=DB;
    