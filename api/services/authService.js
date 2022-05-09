const UserModel = require('../models/UserModel');

class AuthService {
    async register (email, password) {
        const user = await UserModel.findOne({email});
        if (user) {
            throw new Error(`User with email ${email} already exists`);
        }
        const newUser = await UserModel.create({
            email,
            password
        })
    }
    async login (email, password) {

    }
}