module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique:true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true,
      },
      phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique:true
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true,
        unique:false,
      },
      role:{
        type: DataTypes.ENUM('user','admin','company'),
        allowNull: false,
      },
    }, {
      timestamps: false,  
    });

    User.associate = function (models) {
        User.hasMany(models.Cars, {
          foreignKey: 'userId',
          as: 'Cars',
        });
      };
      User.associate = function (models) {
        User.hasMany(models.UserRequests, {
          foreignKey: 'userId',
          as: 'UserRequests',
        });
      }; 
       

    return User;
  };