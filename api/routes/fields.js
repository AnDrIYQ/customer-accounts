// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const FieldController = require('../controllers/FieldsController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/fields', authMiddleware, roleMiddleware, FieldController.get);

// Exports
module.exports = router;