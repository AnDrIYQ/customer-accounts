const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    message: {type: String, required: false},
    from: {type: Schema.Types.ObjectId, rel: 'Admin'},
    to: {type: Schema.Types.ObjectId, rel: 'Customer'},
    date: {type: Date, default: Date.now()},
    invoice: {type: Schema.Types.Mixed, rel: 'Invoice', required: false}
})

module.exports = model('Message', MessageSchema);