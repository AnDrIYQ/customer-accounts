import { ObjectId } from "mongodb";

const { Schema, model } = require('mongoose');
import idToNumber from "../functions/id-to-number";

const InvoiceSchema = new Schema({
    number: {type: Number, required: true, unique: true},
    description: {type: Boolean, required: false},
    price: {type: Number, required: false, default: 0},
    date_of_charge: {type: Date, default: Date.now()},
    customer: {type: Schema.Types.ObjectId, rel: 'Customer', required: true},
    paid: {type: Boolean, required: true},
    was_read: {type: Boolean, required: true},
    items: [
        { type: Schema.Types.ObjectId, ref: 'Service' },
    ]
})

InvoiceSchema.pre("save",function(next) {
    const generateNumber = async (newId) => {
        let generatedId = idToNumber(newId.toString());
        const duplicate = await InvoiceSchema.findOne({ number: generatedId}).exec();
        if (duplicate) {
            const regeneratedId = ObjectId();
            return generateNumber(regeneratedId);
        }
        return generatedId;
    };
    if (this.isNew) {
        this.number = generateNumber(this._id);
    }
    next();
});

module.exports = model('Invoice', InvoiceSchema);