// const { connection } = require("mongoose")
// const { DataTypes } = require("sequelize")

// const { DataTypes } = require("sequelize")

module.exports=(connection,DataTypes)=>{
    // console.log(DataTypes);
    
const compagnies=connection.define('compagnies',{
Name:{
    type:DataTypes.STRING
},
tel:{
    type:DataTypes.INTEGER
},
mail:{
    type:DataTypes.STRING
},

Adresse:{
    type:DataTypes.STRING
},

},{timestamps:false}
)
return compagnies
}



