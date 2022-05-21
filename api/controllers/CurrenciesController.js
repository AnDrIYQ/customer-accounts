const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const currencyService = require('../services/currencyService')
const getAccount = require('../data-functions/account-info')

class CurrencyController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await currencyService.all(req.params.from, req.params.limit);
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
            const response = await currencyService.getById(req.params.id);
            res.status(200).json({status: !!response, data: response})
        } catch(e) {
            next(e);
        }
    }
    async post(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await currencyService.createCurrency(req.body.name, req.body.symbol);
            res.status(200).json({status: !!response, data: response})
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
            const response = await currencyService.updateCurrency(req.params.id, req.body.name, req.body.symbol);
            res.status(200).json(response)
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
            const response = await currencyService.removeCurrency(req.params.id);
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new CurrencyController();