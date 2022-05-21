const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class FieldController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', validationErrors.array()))
            }
            res.status(200).json(true);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new FieldController();