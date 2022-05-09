const authService = require('../services/authService')
const ApiError = require('../exceptions/api-error');
const { validationResult } = require('express-validator');

class AuthController {
    async register(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const {email, password} = req.body;
            const userData = await authService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({status: true, data: userData});
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({status: true, data: userData});
        } catch(e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AuthController();