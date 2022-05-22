const authController = require('../controllers/AuthController');

const Router = require('express').Router
const router = new Router();

const { body } = require('express-validator');

// Admin Register
router.post('/admin-register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    body('username').isLength({min: 4, max: 32}),
    authController.registerAdmin);

// Login
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.login);

// Register
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    body('username').isLength({min: 4, max: 32}),
    authController.register);

// Logout
router.post('/logout',
    authController.logout);

// Refresh Token
router.post('/refresh-token',
    authController.refresh);

module.exports = router;
