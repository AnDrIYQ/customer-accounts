const MessageModel = require('../models/message-model');
const MessageDto = require('../dtos/message-dto');
const ApiError = require('../exceptions/api-error')

class MessageService {
    async write (admin, customerId, message, invoice) {
        return {admin, customerId, message, invoice}
    }
    async removeMessage(admin, customer, id) {

    }
    async getCustomerMessages(customerId) {

    }
}

module.exports = new MessageService();