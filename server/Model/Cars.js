module.exports=(connection,DataTypes)=>{
    // console.log(DataTypes);
    
const Cars=connection.define('Cars',{
Type:{
    type:DataTypes.STRING
},
Brand:{
    type:DataTypes.STRING
},
Km:{
    type:DataTypes.INTEGER
},

Price:{
    type:DataTypes.INTEGER
},
Description:{
    type:DataTypes.STRING
},
Image:{
    type:DataTypes.TEXT
}

},{timestamps:false}
)
return Cars
}



