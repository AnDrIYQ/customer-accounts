const { Schema, model } = require('mongoose');

const TariffSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: false, default: ''},
    price: {type: Number, default: 0},
    fields: [
        {type: Schema.Types.Mixed, rel: 'Field'}
    ],
    terms: {type: Number, required: true}
})

module.exports = model('Tariff', TariffSchema);