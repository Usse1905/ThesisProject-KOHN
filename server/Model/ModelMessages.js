module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        roomId: {
            type: DataTypes.STRING,
            allowNull: false,
            index: true,
        },
    }, {
        timestamps: true,
    });

    Message.associate = function (models) {
        Message.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'User',
        });
        Message.belongsTo(models.Companies, {
            foreignKey: 'companyId',
            as: 'Company',
        });
    };

    return Message;
};
