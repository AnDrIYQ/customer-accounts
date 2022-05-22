const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const fieldsService = require('../services/fieldService')

class FieldController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            const response = await fieldsService.get();
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new FieldController();