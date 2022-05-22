const UserModel = require('../models/user-model');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
        } catch(e) {
            next(e);
        }
    }
    async post(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();