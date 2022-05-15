const { Schema, model } = require('mongoose');

const CustomerSchema = new Schema({
    username: {type: String, required: true},
    bio: {type: String, required: false},
    config: {type: Schema.Types.ObjectId, ref: 'Config'},
    services: [
        {type: Schema.Types.ObjectId, rel: 'Service'}
    ],
    messages: [
        {type: Schema.Types.ObjectId, rel: 'Message'}
    ],
    invoices: [
        {type: Schema.Types.ObjectId, rel: 'Invoice'}
    ]
})

module.exports = model('Customer', CustomerSchema);