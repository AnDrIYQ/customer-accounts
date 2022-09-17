const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const messageService = require('../services/messageService')
const getAccount = require('../data-functions/account-info')

class MessageController {
    async getById(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await messageService.getById(getAccount(req), req.params.id);
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async getForCustomer(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await messageService.getCustomerMessages(getAccount(req), req.params.customer);
            res.status(200).json(response);
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
            const response = await messageService.write(
                getAccount(req).admin,
                req.body.to,
                req.body.message,
                false
            )
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
            const response = await messageService.removeMessage(getAccount(req), req.params.id);
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new MessageController();