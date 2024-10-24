
module.exports = (sequelize, DataTypes) => {
    const UserRequests = sequelize.define('UserRequests', {
      carName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique:true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique:true
      },
      dateOfBirth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfLicense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      pickupDate:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalPrice:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, 
    {
      timestamps: false,  
    });

    UserRequests.associate = function (models) {
        UserRequests.belongsTo(models.Users, {
          foreignKey: 'userId',
          as: 'User',
        });
      };

    
    return UserRequests;
  };