module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define('Admins', {
      userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      timestamps: false,  
    });
  
    return Admins;
  };