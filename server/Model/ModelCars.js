module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define('Cars', {
     userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Users',
          key: 'id'
      }
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Companies',
            key: 'id'
        }
    },
      Name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
      },
      image: {
          type: DataTypes.STRING(2550),
          allowNull: false,
          defaultValue: "",
      },
      price: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      carType: {
          type: DataTypes.STRING(20),
          allowNull: false
      },
      mileage: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      year: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      shift: {
          type: DataTypes.STRING(20),
          allowNull: false
      },
      ac: {
          type: DataTypes.STRING(20),
          allowNull: false
      },
      location: {
          type: DataTypes.STRING(255),
          allowNull: true
      },
  }, {
      timestamps: false,
  });

  Cars.associate = function (models) {
      Cars.belongsTo(models.Companies, {
          foreignKey: 'companyId',
          as: 'Company',
      });
      Cars.belongsTo(models.Users, {  // Ensure correct model reference
          foreignKey: 'userId',
          as: 'User',
      });
  };

  return Cars;
};
