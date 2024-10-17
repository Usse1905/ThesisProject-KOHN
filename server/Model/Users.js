module.exports=(connection,DataTypes)=>{
    // console.log(DataTypes);
    
const Users=connection.define('Users',{
Name:{
    type:DataTypes.STRING
},
PhoneNumber:{
    type:DataTypes.INTEGER
},
Mail:{
    type:DataTypes.STRING
},

Address:{
    type:DataTypes.STRING
},


},{timestamps:false}
)
return Users
}