module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
      userName: {
          type: DataTypes.STRING(60),
          allowNull: true,
          unique: true,
      },
      password: {
          type: DataTypes.STRING(255),
          allowNull: true,
      },
      email: {
          type: DataTypes.STRING(60),
          allowNull: true,
          unique: true,
      },
      phoneNumber: {
          type: DataTypes.INTEGER,
          unique: true,
          allowNull: true,
      },
      address: {
          type: DataTypes.STRING(500),
          allowNull: true,
          unique: true,
      },
      cin: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      dateOfBirth: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
      },
      dateOfLicense: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0
      },
      image: {
          type: DataTypes.STRING(300),
          allowNull: true,
          unique: true,
      },
      joined: {
          type: DataTypes.DATE,
      },
      role: {
          type: DataTypes.ENUM('user', 'admin', 'company'),
          allowNull: true,
      },
  }, {
      timestamps: false,
  });

  Users.associate = function (models) {
      Users.hasMany(models.Cars, {
          foreignKey: 'userId',
          as: 'Cars',
      });
      Users.hasMany(models.UserRequests, {
          foreignKey: 'userId',
          as: 'UserRequests',
      });
      Users.hasMany(models.Message, {
          foreignKey: 'userId',
          as:'messages',
      });
  }
  return Users
}
