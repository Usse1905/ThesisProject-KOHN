module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique:true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique:true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique:true,
        defaultValue:0
      },
      dateOfBirth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      dateOfLicense: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
      },
      image: {
        type: DataTypes.STRING(300),
        allowNull: true,
        unique:true,
      },
      role:{
        type: DataTypes.ENUM('user','admin','company'),
        allowNull: true,
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