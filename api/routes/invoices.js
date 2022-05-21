// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const InvoiceController = require('../controllers/InvoicesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/invoices', authMiddleware, roleMiddleware, InvoiceController.get);
router.get('/invoices/:from/:limit', authMiddleware, roleMiddleware, InvoiceController.get);

router.get('/customer-invoices/', authMiddleware, InvoiceController.getForCustomer);
router.get('/customer-invoices/:from/:limit', authMiddleware, InvoiceController.getForCustomer);

router.post('/invoices/charge/:customer',
    body('description').isLength({min: 6, max: 32}),
    authMiddleware, roleMiddleware, InvoiceController.post);
router.delete('/invoices/delete/:id', authMiddleware, roleMiddleware, InvoiceController.remove);

router.put('/invoice-paid/:id', authMiddleware, roleMiddleware, InvoiceController.makePaid);
router.put('/invoice-was-read/:id', authMiddleware, InvoiceController.read);

// Exports
module.exports = router;