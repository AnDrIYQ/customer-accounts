const authController = require('../controllers/AuthController');

const Router = require('express').Router
const router = new Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refresh);

module.exports = router;
