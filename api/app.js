const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

// Middlewares imports
const errorMiddleware = require('./middlewares/error-middleware');

// Routes imports
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes uses
app.use(authRouter);
app.use(usersRouter);

// Uses middlewares
app.use(errorMiddleware);


module.exports = app;
