module.exports = (sequelize, DataTypes) => {
    const Companies = sequelize.define('Companies', {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address:{
        type:DataTypes.STRING(255),
        allowNull:false
      },
      phoneNumber:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      website : {
        type : DataTypes.STRING(255),
        allowNull : false
      },
      licensesinceWhen:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      lei:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      
    }, {
      timestamps: false,  
    });
  
    Companies.associate = function (models) {
      Companies.hasMany(models.Cars, {
        foreignKey: 'companyId',
        as: 'Cars',
      });
    };
  
    return Companies;
  };