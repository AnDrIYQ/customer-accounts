const dotenv = require('dotenv').config();

const app = require('./app/index');

// API
app.listen(process.env.API_PORT, () => {
    console.log(`API started in port ${process.env.API_PORT}`)
})
