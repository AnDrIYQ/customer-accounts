const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    admin_status: {type: Schema.Types.ObjectId, ref: 'Admin', required: false},
    customer_status: {type: Schema.Types.ObjectId, ref: 'Customer', required: false}
})

module.exports = model('User', UserSchema);