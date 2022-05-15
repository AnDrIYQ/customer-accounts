const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class ImageController {
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
}

module.exports = new ImageController();