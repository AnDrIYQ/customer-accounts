const { ObjectId } = require("mongodb");

const { Schema, model } = require('mongoose');
const idToNumber = require("../data-functions/id-to-number");

const InvoiceSchema = new Schema({
    number: {type: Number, required: true, unique: true},
    description: {type: String, required: false},
    price: {type: Number, required: false, default: 0},
    date_of_charge: {type: Date, default: Date.now()},
    customer: {type: Schema.Types.ObjectId, rel: 'Customer', required: true},
    paid: {type: Boolean, required: false, default: false},
    was_read: {type: Boolean, required: true, default: false},
    items: {type: Array, required: false, default: []}
})

InvoiceSchema.pre("validate",function(next) {
    if (this.isNew) {
        this.number = idToNumber().toString();
    }
    next();
});

module.exports = model('Invoice', InvoiceSchema);