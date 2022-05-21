// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const MessageController = require('../controllers/MessagesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/messages-customer-admin/:customer/:admin', authMiddleware, MessageController.getForCustomer);
router.post('/messages/write',
    body('message').isLength({min: 4, max: 1000}),
    body('to').not().isEmpty(),
    authMiddleware, roleMiddleware, MessageController.post);

router.delete('/messages/:id', authMiddleware, roleMiddleware, MessageController.remove);

// Exports
module.exports = router;