const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const tariffService = require("../services/tariffService");

class TariffController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await tariffService.get(req.params.from, req.params.limit);
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
            const response = await tariffService.getById(req.params.id);
            res.status(200).json({status: !!response, data: response})
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
            const response = await tariffService.create(
                req.body.name,
                req.body.description,
                Number(req.body.price),
                Number(req.body.terms),
                req.body.fields
            );
            res.status(200).json(response)
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
            const response = await tariffService.update(
                req.body.name,
                req.body.description,
                Number(req.body.price),
                Number(req.body.terms),
                req.body.fields
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
            const response = await tariffService.remove(req.params.id);
            res.status(200).json(response)
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new TariffController();