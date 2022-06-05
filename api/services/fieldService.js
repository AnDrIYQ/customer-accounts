const FieldModel = require('../models/field-model');
const FieldDto = require('../dtos/field-dto');
const ApiError = require('../exceptions/api-error')
const {ObjectId} = require("mongodb");

class FieldService {
    async get() {
        return FieldModel.find({});
    }
    async removeByTariff(tariffId) {
        await FieldModel.remove({tariff: tariffId});
    }
}

module.exports = new FieldService();