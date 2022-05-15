// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const AdminController = require('../controllers/AdminsController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.put('/admins/update',
    body('username').isLength({min: 4, max: 32}),
    body('bio').optional().isLength({min: 4, max: 32}),
    authMiddleware, roleMiddleware,  AdminController.update);

// Exports
module.exports = router;