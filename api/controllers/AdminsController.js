const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class AdminController {
    async update(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AdminController();