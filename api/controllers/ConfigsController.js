const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const configService = require('../services/configService')
const getAccountInfo = require('../data-functions/account-info')
const validateConfigInput = require('../validators/validate-config')

class ConfigController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await configService.get(req.params.id);
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const valid = validateConfigInput(req.body.theme_color, req.body.notifications);
            if (!valid) {
                return next(ApiError.BadRequest('Validation error'))
            }
            const response = await configService.update(getAccountInfo(req), {
                theme_color: req.body.theme_color,
                notifications: req.body.notifications,
                currency: req.body.currency,
                image: req.files[0]?.filename
            });
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
            const response = await configService.reset(req.params.id, getAccountInfo(req));
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ConfigController();