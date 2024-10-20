module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      timestamps: false,  
    });

    Users.associate = function (models) {
        Users.hasMany(models.Cars, {
          foreignKey: 'userId',
          as: 'Cars',
        });
      };
  
    return Users;
  };