const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    tariff: {type: Schema.Types.ObjectId, rel: 'Tariff'},
    customer: {type: Schema.Types.ObjectId, rel: 'Customer'},
    date: {type: Date, default: Date.now()},
    date_to: {type: Date, required: true},
    price: {type: Number, default: 0},
})

module.exports = model('Service', ServiceSchema);