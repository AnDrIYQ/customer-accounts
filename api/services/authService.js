const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error')

const tokenService = require('../services/tokenService')

class AuthService {
    async register (email, password) {
        const user = await UserModel.findOne({email});
        if (user) {
            throw ApiError.BadRequest(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const newUser = await UserModel.create({
            email,
            password: hashPassword
        })
        const userDTO = new UserDto(newUser);
        const tokens = tokenService.generateTokens({...userDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO
        }
    }
    async login (email, password) {
    }
}

module.exports = new AuthService();