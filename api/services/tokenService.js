const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
            expiresIn: "7d"
        });
        return {
            accessToken,
            refreshToken
        };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token.save();
    }
}

module.exports = new TokenService();