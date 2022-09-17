const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const adminService = require('../services/adminService')
const {base64decode} = require("nodejs-base64");

const getAccountInfo = require('../data-functions/account-info')

class AdminController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await adminService.get();
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await adminService.updateAdmin(req.body.username, req.body.bio, getAccountInfo(req));
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AdminController();