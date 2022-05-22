const ServiceModel = require('../models/service-model');
const InvoiceModel = require('../models/invoice-model');
const ServiceDto = require('../dtos/service-dto');
const ApiError = require('../exceptions/api-error')
const {ObjectId} = require("mongodb");
const tariffService = require('../services/tariffService')
const TariffDto = require("../dtos/tariff-dto");

class ServiceService {
    async get (customerId, from = 0, limit = null) {
        return ServiceModel.find({customer: customerId}, {}, {from: from, limit: limit});
    }
    async getById (id, customerId) {
        return ServiceModel.findOne({customer: customerId, _id: id});
    }
    async getForChargeCustomer (customerId) {
        const invoices = await InvoiceModel.find({customer: customerId});
        let filterIds = [];
        await Promise.all(invoices.map(async (invoice) => {
            invoice.items.map((item) => {
                if (!filterIds.includes(item._id)) {
                    filterIds.push(item._id)
                }
            })
        }));
        let excludes = [];
        filterIds.map(id => {
            excludes.push({_id: {$ne: id} })
        })
        return ServiceModel.find({
            customer: customerId,
            $and: excludes
        });
    }
    async getForAdmin (from = 0, limit = null) {
        return ServiceModel.find({}, {}, {from: from, limit: limit});
    }
    async getForAdminById (id) {
        return ServiceModel.find({_id: ObjectId(id)});
    }
    async remove (id, customerId) {
        return ServiceModel.findOneAndDelete({customer: customerId, _id: ObjectId(id)});
    }
    async create (name, date_to, description, date, tariff, customerId) {
        const fromTariff = await tariffService.getById(tariff);
        if (!fromTariff) {
            throw ApiError.BadRequest("Service tariff does not exists")
        }
        const newService = new ServiceModel({
            name,
            tariff: ObjectId(tariff),
            customer: ObjectId(customerId)
        })
        if (description) {
            newService.description = description
        }
        newService.date = new Date();
        if (date) {
            newService.date = new Date(date)
        }
        let dateTo;
        if (date_to) {
            dateTo = new Date(date_to);
        }
        if (!dateTo) {
            dateTo = new Date(new Date().setMonth(new Date().getMonth() + Number(fromTariff.terms)));
        }
        newService.date_to = dateTo;
        newService.price = Number(fromTariff.price) * Number(fromTariff.terms);
        const created = await newService.save();
        const tariffData = new TariffDto(fromTariff);
        return {
            status: !!created,
            data: {
                tariff_name: tariffData.name,
                tariff_terms: tariffData.terms,
                ...new ServiceDto(created)
            }
        }
    }
}

module.exports = new ServiceService();