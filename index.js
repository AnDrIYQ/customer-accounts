const dotenv = require('dotenv').config();

const app = require('./app/index');

// APP
app.listen(process.env.APP_PORT, () => {
    console.log(`Application started in port ${process.env.APP_PORT}`)
})

// API