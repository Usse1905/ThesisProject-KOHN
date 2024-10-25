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
  
    return User;
  };