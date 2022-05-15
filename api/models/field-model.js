const { Schema, model } = require('mongoose');

const FieldSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true, unique: true},
    value: {type: Schema.Types.Mixed, required: true},
    tariff: {type: Schema.Types.ObjectId, rel: 'Tariff'},
})

module.exports = model('Field', FieldSchema);