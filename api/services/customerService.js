const CustomerModel = require('../models/customer-model');
const ConfigModel = require('../models/config-model');
const ServiceModel = require('../models/service-model');
const UserModel = require("../models/user-model");
const MessageModel = require("../models/message-model");
const CustomerDto = require('../dtos/customer-dto');
const ApiError = require('../exceptions/api-error')
const {ObjectId} = require("mongodb");
const compareAccount = require('../data-functions/compare-account');
const authService = require('../services/authService')
const bcrypt = require("bcrypt");

class CustomerService {
    async get (from = 0, limit = null) {
        let users = []
        const customers = await CustomerModel.find({}, {},{skip: from, limit})
        customers.map((r) => users.push(r.toObject()));
        await Promise.all(users.map(async (user) => {
            const account = await UserModel.findOne({customer_status: ObjectId(user._id)})
            const config = await ConfigModel.findOne({_id: ObjectId(user.config)})
            user.email = account.email;
            user.password = account.password;
            user.image = config.image;
            user.color = config.theme_color;
        }));
        return {users}
    }
    async getById (id, account) {
        const customerData = new CustomerDto(await CustomerModel.findOne({_id: ObjectId(id)}));
        const customerAccount = await UserModel.findOne({customer_status: ObjectId(customerData.id)})
        if (account.email !== customerAccount.email) {
            throw ApiError.AccessError();
        }
        customerData.email = customerAccount.email;
        customerData.password = customerAccount.password;
        return {
            status: !!customerData,
            data: customerData
        }
    }
    async update (username, bio, password, account) {
        const user = await UserModel.findById(ObjectId(account.id));
        !compareAccount(account, user) ? ApiError.AccessError() : false;
        const customer = await CustomerModel.findById(user.customer_status);
        !compareAccount(account.customer, customer) ? ApiError.AccessError() : false;

        if (bio) {
            customer.bio = bio;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 3);
        }
        customer.username = username;
        const customerSaved = await customer.save();
        const userSaved = await user.save();

        return {
            status: !!customerSaved && !!userSaved,
            data: {...new CustomerDto(customer), user: {...user._doc}}
        }
    }
    async remove (account) {
        if (!account.customer || !account.customer.id) {
            throw ApiError.AccessError();
        }
        const customerAccountDeleted = await authService.remove(account.email);
        await CustomerModel.findOneAndDelete({customer_status: account.customer_status});
        await ConfigModel.findOneAndDelete({});
        await MessageModel.remove({to: account.customer.id});
        await ServiceModel.remove({customer: account.customer.id});
        return {
            status: !!customerAccountDeleted
        }
    }
}

module.exports = new CustomerService();