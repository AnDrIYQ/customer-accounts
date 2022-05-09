const authService = require('../services/authService')

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({status: true, data: userData});
        } catch(e) {
            res.status(500).json({status: false, message: e});
        }
    }
    async login(req, res, next) {
        try {
            
        } catch(e) {

        }
    }
    async logout(req, res, next) {
        try {

        } catch(e) {

        }
    }
    async refresh(req, res, next) {
        try {

        } catch(e) {

        }
    }
}

module.exports = new AuthController();