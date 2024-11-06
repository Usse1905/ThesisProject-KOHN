const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const UserRequests = sequelize.define('UserRequests', {
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
        carName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        requestername: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            type: DataTypes.STRING(300),
            allowNull: true
        },
        pickupDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Confirmed', 'Delivered', 'Closed', 'Canceled'),
            allowNull: true,
            defaultValue: 'Pending'
        },
        statusHistory: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        requestNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
        defaultScope: {
            include: [
                { model: sequelize.models.Users, as: 'User' },
                { model: sequelize.models.Companies, as: 'Company' }
            ]
        }
    });

    UserRequests.addHook('beforeCreate', (userRequest) => {
        const newRequestNumber = `REQ-2024-${uuidv4().slice(0, 8)}`;
        userRequest.requestNumber = newRequestNumber;
    });

    UserRequests.associate = function (models) {
        UserRequests.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'User',
        });
        UserRequests.belongsTo(models.Companies, {
            foreignKey: 'companyId',
            as: 'Company',
        });
    };


    return UserRequests;
};
