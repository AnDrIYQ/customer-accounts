const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const customerService = require("../services/customerService");
const getAccount = require('../data-functions/account-info')

class CustomerController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await customerService.get(req.params.from, req.params.limit);
            res.status(200).json({status: !!response, data: response})
        } catch(e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await customerService.getById(req.params.id, getAccount(req));
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await customerService.update(req.body.username, req.body.bio, req.body.password, getAccount(req));
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await customerService.remove(getAccount(req));
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new CustomerController();