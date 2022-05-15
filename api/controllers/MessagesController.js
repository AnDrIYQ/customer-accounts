const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class MessageController {
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
    async getForAdmin(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
        } catch(e) {
            next(e);
        }
    }
    async getForCustomer(req, res, next) {
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
    async remove(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new MessageController();