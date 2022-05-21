const TariffModel = require('../models/tariff-model');
const TariffDto = require('../dtos/tariff-dto');
const ApiError = require('../exceptions/api-error')
const FieldModel = require("../models/field-model");
const {ObjectId} = require("mongodb");
const fieldService = require('./fieldService');
const ServiceModel = require("../models/service-model");

class TariffService {
    validField(field) {
        if (!field.title || typeof field.title !== 'string') {
            throw ApiError.BadRequest("Field title invalid")
        }
        if (!field.type || typeof field.type !== 'string') {
            throw ApiError.BadRequest("Field type invalid")
        }
        if (!field.value) {
            throw ApiError.BadRequest("Field value invalid")
        }
    }
    async get (from = 0, limit = null) {
        return TariffModel.find({}, {},{skip: from, limit});
    }
    async getById (id) {
        return TariffModel.findOne({_id: id});
    }
    async create (name, description, price, terms, fields) {
        const exists = await TariffModel.findOne({name});
        if (exists) {
            throw ApiError.BadRequest("Tariff already exists")
        }
        const tariff = new TariffModel({
            name,
            price,
            terms,
            description
        });
        let fieldsIds = [];
        await Promise.all(fields.map(async (field) => {
            this.validField(field);
            const newField = await FieldModel.create({
                title: field.title,
                type: field.type,
                value: field.value,
                tariff: tariff._id
            });
            fieldsIds.push(newField);
        }));
        tariff.fields = fieldsIds;
        const created = await tariff.save();

        return {
            status: !!created,
            data: new TariffDto(created)
        }
    }
    async remove (id) {
        const exists = await TariffModel.findById(ObjectId(id));
        if (!exists) {
            throw ApiError.BadRequest("Tariff does not exists")
        }
        const tariffId = exists._id;
        const removedServices = await ServiceModel.deleteMany({tariff: tariffId});
        const removedFields = await FieldModel.deleteMany({tariff: tariffId})
        const deleted = await exists.remove();
        return {
            status: !!removedServices && !!removedFields && !!deleted
        }
    }
    async update (name, description, price, terms, fields) {
        const exists = await TariffModel.findOne({name});
        if (!exists) {
            throw ApiError.BadRequest("Tariff does not exists")
        }
        if (description) {
            exists.description = description;
        }
        if (price) {
            exists.price = price;
        }
        if (terms) {
            exists.terms = terms;
        }
        if (fields) {
            await fieldService.removeByTariff(exists._id);
            let fieldsIds = [];
            await Promise.all(fields.map(async (field) => {
                this.validField(field);
                const newField = await FieldModel.create({
                    title: field.title,
                    type: field.type,
                    value: field.value,
                    tariff: exists._id
                });
                fieldsIds.push(newField);
            }));
            exists.fields = fieldsIds;
        }
        const saved = await exists.save();
        return {
            status: !!saved,
            data: new TariffDto(saved)
        }
    }
}

module.exports = new TariffService();