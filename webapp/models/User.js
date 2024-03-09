
const { Sequelize, DataTypes, UUIDV1 } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sequelize.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:UUIDV1
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            is:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/,
            
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
},
    {
        timestamps: true,
        updatedAt: 'account_updated',
        createdAt: 'account_created'
    })

User.beforeCreate(async (user,options) =>{
    const hashedPassword = await bcrypt.hash(user.password,10);
    user.password = hashedPassword
})

User.beforeUpdate(async (user,options) =>{
    options.validate=false;
})

module.exports = User;
