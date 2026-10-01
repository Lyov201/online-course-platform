const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255]
        }
    },

    role: {
        type: DataTypes.ENUM('admin', 'instructor', 'student'),
        allowNull: false,
        defaultValue: 'student'
    }

}, {
    timestamps: true
})

module.exports = User;