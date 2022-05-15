// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const CurrencyController = require('../controllers/CurrenciesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/currencies', authMiddleware, CurrencyController.get);
router.get('/currencies/:id', authMiddleware, CurrencyController.getById);

router.post('/currencies/add',
    body('name').isLength({min: 4, max: 10}),
    body('symbol').optional().isLength({max: 1, min: 1}),
    authMiddleware, roleMiddleware, CurrencyController.post);
router.put('/currencies/update',
    body('name').isLength({min: 4, max: 10}),
    body('symbol').optional().isLength({max: 1, min: 1}),
    authMiddleware, roleMiddleware, CurrencyController.update);
router.delete('/currencies/delete/:id', authMiddleware, roleMiddleware, CurrencyController.remove);

// Exports
module.exports = router;