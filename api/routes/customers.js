// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const CustomerController = require('../controllers/CustomersController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/customers', authMiddleware, roleMiddleware, CustomerController.get);
router.get('/customers/:id', authMiddleware, CustomerController.getById);

router.delete('/customers/delete/:id', authMiddleware, CustomerController.remove);
router.put('/customers/update',
    body('username').isLength({min: 4, max: 32}),
    body('bio').optional().isLength({min: 4, max: 32}),
    authMiddleware, CustomerController.update);

// Exports
module.exports = router;