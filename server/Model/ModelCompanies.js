module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  
    Company.associate = function (models) {
      Company.hasMany(models.Cars, {
        foreignKey: 'companyId',
        as: 'Cars',
      });
    };
  
    return Company;
  };
  