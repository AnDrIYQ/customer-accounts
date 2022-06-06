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
const adminsRouter = require('./routes/admins');
const configsRouter = require('./routes/configs');
const currenciesRouter = require('./routes/currencies');
const customersRouter = require('./routes/customers');
const fieldsRouter = require('./routes/fields');
const imagesRouter = require('./routes/images');
const invoicesRouter = require('./routes/invoices');
const messagesRouter = require('./routes/messages');
const servicesRouter = require('./routes/services');
const tariffsRouter = require('./routes/tariffs');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://31.131.24.72:3000'
}));
app.use(cookieParser());
// Routes uses
app.use(authRouter);
app.use(usersRouter);
app.use(adminsRouter);
app.use(configsRouter);
app.use(currenciesRouter);
app.use(customersRouter);
app.use(fieldsRouter);
app.use(imagesRouter);
app.use(invoicesRouter);
app.use(messagesRouter);
app.use(servicesRouter);
app.use(tariffsRouter);

// Uses middlewares
app.use(errorMiddleware);

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});
server.listen(process.env.SOCKET_PORT, () => {
    console.log(`Listening on ${process.env.SOCKET_PORT}`);
});
EVENT_BUS = null
io.on('connection', (socket) => {
    let query = socket.handshake.query;
    let roomName = query.roomName;
    if (roomName === 'false') {
        socket.emit('info', "Account is not a customer")
        return;
    }
    socket.join(roomName);
    EVENT_BUS = {
        io,
        socket,
        room: roomName
    }
    socket.emit('connected', query.roomName);
})

module.exports = app;
