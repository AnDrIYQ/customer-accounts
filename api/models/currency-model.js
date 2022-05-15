const { Schema, model } = require('mongoose');

const CurrencySchema = new Schema({
    name: {type: String, required: true, unique: true},
    symbol: {type: String, required: false, maxLength: 1},
})

module.exports = model('Currency', CurrencySchema);