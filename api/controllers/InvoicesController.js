const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const invoiceService = require('../services/invoiceService')

const getAccount = require('../data-functions/account-info')

class InvoiceController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await invoiceService.all(req.params.from, req.params.limit);
            res.status(200).json(response);
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
            const customer = getAccount(req).customer?.id
            const response = await invoiceService.getForCustomer(customer, req.params.from, req.params.limit);
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async read(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const customer = getAccount(req).customer?.id
            const response = await invoiceService.read(customer, req.params.id);
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async makePaid(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await invoiceService.makePaid(req.params.id, getAccount(req));
            res.status(200).json(response)
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
            const response = await invoiceService.charge(
                req.params.customer,
                req.body.description,
                getAccount(req).admin
            );
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
            const response = await invoiceService.remove(req.params.id);
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new InvoiceController();