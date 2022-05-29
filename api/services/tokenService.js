const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
            expiresIn: "2h"
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
            expiresIn: "7d"
        });
        return {
            accessToken,
            refreshToken
        };
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS)
            return userData;
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH)
            console.log(userData)
            return userData;
        } catch (e) {
            return null;
        }
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
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();