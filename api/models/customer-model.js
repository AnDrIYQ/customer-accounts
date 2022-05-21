const { Schema, model } = require('mongoose');

const CustomerSchema = new Schema({
    username: {type: String, required: true},
    bio: {type: String, required: false},
    config: {type: Schema.Types.ObjectId, ref: 'Config'},
})

module.exports = model('Customer', CustomerSchema);