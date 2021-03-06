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
            const {email, password, username, bio} = req.body;
            const userData = await authService.register(email, password, username, bio);
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
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch(e) {
            next(e);
        }
    }
    async registerAdmin(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const {email, password, username, bio} = req.body;
            const userData = await authService.registerAdmin(email, password, username, bio);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({status: true, data: userData});
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AuthController();