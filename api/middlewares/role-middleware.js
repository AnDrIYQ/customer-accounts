const ApiError = require('../exceptions/api-error')
const UserModel = require('../models/user-model');
const { base64decode } = require('nodejs-base64');
const tokenService = require("../services/tokenService");
module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        const tokenData = JSON.parse(base64decode(accessToken.split('.')[1]));
        const admin = await UserModel.findOne({email: tokenData.email});
        if (!admin || !admin.admin_status) {
            return next(ApiError.AccessError());
        }
        next();
    } catch (e) {
        return next(ApiError.AccessError());
    }
};