const MessageModel = require('../models/message-model');
const CustomerModel = require('../models/customer-model');
const MessageDto = require('../dtos/message-dto');
const ApiError = require('../exceptions/api-error')

class MessageService {
    async write (admin, customerId, message, invoice) {
        const customer = await CustomerModel.findById(customerId);
        if (!customer) {
            throw ApiError.BadRequest("This customer does not exists");
        }
        const newMessage = new MessageModel({
            message,
            from: admin.id,
            to: customer._id,
            invoice: invoice.number
        })
        const saved = await newMessage.save();
        if (saved) {
            EVENT_BUS?.io?.to(customerId.toString())?.emit('message', newMessage)
        }
        return {
            status: !!saved,
            data: saved
        }
    }
    async removeMessage(account, id) {
        const deleted = await MessageModel.findOneAndDelete({_id: id, from: account.admin.id});
        return {
            status: !!deleted,
        }
    }
    async getById (account, id) {
        const message = await MessageModel.findById(id);
        if (!message) {
            throw ApiError.BadRequest("This message does not exists")
        }
        if (!account.customer || account.customer.id != message.to) {
            throw ApiError.AccessError();
        }
        return {
            status: !!message,
            data: message
        }
    }
    async getCustomerMessages(account, customerId) {
        if (account.admin) {
            return MessageModel.find({to: customerId});
        }
        if (account.customer.id !== customerId) {
            throw ApiError.AccessError();
        }
        return MessageModel.find({to: customerId});
    }
}

module.exports = new MessageService();