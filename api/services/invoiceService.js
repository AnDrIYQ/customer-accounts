const ImageModel = require('../models/image-model');
const ServiceModel = require('../models/service-model');
const InvoiceModel = require('../models/invoice-model');
const ApiError = require('../exceptions/api-error')
const messageService = require('../services/messageService');

const serviceService = require('../services/serviceService')

// Message Notification text
const MESSAGE_NOTIFICATION = (number) => `Your services has been charged with an invoice with a number ${number}`;

class InvoiceService {
    async all (from = 0, limit = null) {
        return InvoiceModel.find({}, {}, {from: from, limit: limit})
    }
    async getForCustomer(customerId, from = 0, limit = null) {
        return InvoiceModel.find({customer: customerId}, {}, {from: from, limit: limit})
    }
    async charge(customerId, description, admin) {
        const services = await serviceService.getForChargeCustomer(customerId);
        if (!services.length) {
            throw ApiError.BadRequest("All services already charged");
        }
        let total = 0;
        let items = [];
        await Promise.all(services.map(async (service) => {
            items.push(service.toObject());
            total += Number(service.price)
        }));
        const newInvoice = new InvoiceModel({
            description,
            isNew: true,
            price: total,
            customer: customerId,
            items
        })
        const saved = await newInvoice.save();
        if (saved) {
            await messageService.write(admin, customerId, MESSAGE_NOTIFICATION(newInvoice.number), saved);
        }
        return {
            status: !!saved,
            data: saved
        }
    }
    async makePaid(id) {
        const isMade = await InvoiceModel.findByIdAndUpdate(id, {paid: true});
        return {
            status: !!isMade
        }
    }
    async read (customerId, id) {
        const wasRead = await InvoiceModel.findOneAndUpdate(
            {customer: customerId, _id: id},
            {was_read: true}
        );
        return {
            status: !!wasRead
        }
    }
    async remove(id) {
        const deleted = await InvoiceModel.findByIdAndRemove(id);
        return {
            status: !!deleted,
            data: deleted
        }
    }
}

module.exports = new InvoiceService();