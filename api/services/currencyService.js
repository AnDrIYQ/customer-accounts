const CurrencyModel = require('../models/currency-model');
const CurrencyDto = require('../dtos/currency-dto');
const ApiError = require('../exceptions/api-error')
const {ObjectId} = require("mongodb");

class CurrencyService {
    async all (from = 0, limit = null) {
        return CurrencyModel.find({}, {},{skip: from, limit});
    }
    async getById (id) {
        return new CurrencyDto(await CurrencyModel.findOne({_id: ObjectId(id)}));
    }
    async createCurrency (name, symbol) {
        const currency = await CurrencyModel.findOne({name: name})
        if (currency) {
            throw ApiError.BadRequest("Currency already exists");
        }
        return new CurrencyDto(await CurrencyModel.create({
            name: name,
            symbol: symbol
        }));
    }
    async updateCurrency (id, name, symbol) {
        const currency = await CurrencyModel.findOne({ _id: ObjectId(id) });
        if (!currency) {
            throw ApiError.BadRequest("Currency with this id does not exists");
        }
        currency.name = name;
        if (symbol) {
            currency.symbol = symbol
        }
        const isSaved = await currency.save();
        return {
            status: !!isSaved,
            data: new CurrencyDto(currency)
        }
    }
    async removeCurrency (id) {
        const isDeleted = await CurrencyModel.deleteOne({ _id: ObjectId(id) });
        return {
            status: isDeleted
        }
    }
}


module.exports = new CurrencyService();