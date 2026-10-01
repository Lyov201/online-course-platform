const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const authData = await authService.login(req.body);

        res.status(200).json({
           success: true,
           data: authData
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
}