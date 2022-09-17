const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const imageService = require('../services/imageService')

class ImageController {
    async get(req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка валідації', validationErrors.array()))
            }
            const response = await imageService.get()
            res.status(200).json(response);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ImageController();