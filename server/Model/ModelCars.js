module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define('Cars', {
      Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image:{
        type:DataTypes.STRING(255),
        allowNull:true
      },
      price:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      carType : {
        type : DataTypes.STRING(255),
        allowNull : false
      },
      mileage:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      year:{
        type : DataTypes.INTEGER,
        allowNull:false
      },
      shift : {
        type : DataTypes.STRING(255),
        allowNull: false
      },
      ac : {
        type : DataTypes.STRING(255),
        allowNull : false
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id',
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      
    }, {
      timestamps: false,  
    });
  
    Cars.associate = function (models) {
      Cars.belongsTo(models.Companies, {
        foreignKey: 'companyId',
        as: 'Company',
      });
    };

    Cars.associate = function (models) {
        Cars.belongsTo(models.Users, {
          foreignKey: 'userId',
          as: 'User',
        });
      };
  
    return Cars;
  };