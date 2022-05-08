const dotenv = require('dotenv').config();

const app = require('./api/app');

// API
app.listen(process.env.API_PORT, () => {
    console.log(`API started in port ${process.env.API_PORT}`)
})
