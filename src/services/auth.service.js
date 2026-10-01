const bcrypt = require('bcryptjs');
const { User } = require('../models');
const ROLES = require('../constants/roles');
const {generateToken} = require('../utils/jwt');


const register = async (data) => {
    const { fullName, email, password } = data;

    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }

    const existingUser = await User.findOne({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullName,
        email,
        password: passwordHash,
        role: ROLES.STUDENT
    });

    const userData = newUser.toJSON();

    delete userData.password;

    return userData;
};

const login = async (data) => {
    const {email, password} =  data;
    const user = await User.findOne({
        where: {
            email
        }
    });

    if(user === null) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
         throw new Error('Invalid email or password');
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    });

    const userData = user.toJSON();

    delete userData.password;

    return {
        token,
        user: userData
    };
}

module.exports = {
    register,
    login
};