module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define('Companies', {
      name: {
          type: DataTypes.STRING(20),
          allowNull: false,
      },
      address: {
          type: DataTypes.STRING(100),
          allowNull: true,
      },
      phoneNumber: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      website: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isApproved: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      licensesinceWhen: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      lei: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      notificationSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
  }, {
      timestamps: false,
  });

  Companies.associate = function (models) {
      Companies.hasMany(models.Cars, {
          foreignKey: 'companyId',
          as: 'Cars',
      });
      
      Companies.hasMany(models.UserRequests, {
          foreignKey: 'companyId',
          as: 'UserRequests',
      });
  };

  return Companies;
};
