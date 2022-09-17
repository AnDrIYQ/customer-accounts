const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const serviceService = require('../services/serviceService')
const getAccount = require('../data-functions/account-info');

class ServiceController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const customerId = getAccount(req).customer?.id;
            const response = await serviceService.get(customerId, req.params.from, req.params.limit)
            res.status(200).json({status: !!response, data: response})
        } catch(e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const customerId = getAccount(req).customer?.id;
            const response = await serviceService.getById(req.params.id, customerId);
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }
    async getForAdmin(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await serviceService.getForAdmin(req.params.from, req.params.limit)
            res.status(200).json({status: !!response, data: response})
        } catch(e) {
            next(e);
        }
    }
    async getForAdminById(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await serviceService.getForAdminById(req.params.id);
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }
    async post(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await serviceService.create(
                req.body.name,
                req.body.date_to,
                req.body.description,
                req.body.date,
                req.body.tariff,
                getAccount(req).customer?.id
            );
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const customerId = getAccount(req).customer?.id;
            const response = await serviceService.remove(req.params.id, customerId);
            res.status(200).json({status: !!response})
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ServiceController();