// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers

// Services
const uploadImages = require('../services/imageService')

// Router
const Router = require('express').Router
const router = new Router();

// Actions

// Exports
module.exports = router;