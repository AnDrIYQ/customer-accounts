const ConfigModel = require('../models/config-model');
const AdminModel = require('../models/admin-model');
const CustomerModel = require('../models/customer-model');
const UserModel = require('../models/user-model');
const ConfigDto = require('../dtos/config-dto');
const ApiError = require('../exceptions/api-error')
const {ObjectId} = require("mongodb");
const DEFAULT_CONFIG = require('../data-functions/default-config');

class ConfigService {
    async updateConfigById(id, account, newData) {
        const config = await ConfigModel.findOne({_id: ObjectId(id)});
        if (!config) {
            throw ApiError.BadRequest("Config with this id does not exists")
        }
        const configAdmin = await AdminModel.findOne({config: ObjectId(config._id)});
        const configCustomer = await CustomerModel.findOne({config: ObjectId(config._id)});
        if (!configAdmin && !configCustomer) {
            throw ApiError.BadRequest("User with this config does not exists")
        }
        if (!configAdmin) {
            if (account.customer.id != ObjectId(configCustomer._id)) {
                throw ApiError.AccessError();
            }
        }
        if (!configCustomer) {
            if (account.admin.id != ObjectId(configAdmin._id)) {
                throw ApiError.AccessError();
            }
        }
        config.theme_color = newData.theme_color;
        config.notifications = newData.notifications;
        const isSaved = await config.save();
        return {
            status: !!isSaved,
            data: new ConfigDto(config)
        }
    }
    async updateConfig(account, newData) {
        let config;
        const user = await UserModel.findOne({email: account.email});
        const admin = await AdminModel.findOne({_id: user.admin_status});
        const customer = await CustomerModel.findOne({_id: user.customer_status});
        if (!admin && !customer) {
            throw ApiError.BadRequest("User with this config does not exists")
        }
        if (!admin) {
            config = await ConfigModel.findOne({_id: ObjectId(customer.config)})
        }
        if (!customer) {
            config = await ConfigModel.findOne({_id: ObjectId(admin.config)})
        }
        if (!config) {
            throw ApiError.BadRequest("There are no configs for this user")
        }
        config.theme_color = newData.theme_color;
        config.notifications = newData.notifications;
        const isSaved = await config.save();
        return {
            status: !!isSaved,
            data: new ConfigDto(config)
        }
    }
    async get (id) {
        const config = await ConfigModel.findOne({_id: ObjectId(id)});
        if (!config) {
            throw ApiError.BadRequest("Config with this id does not exists")
        }
        return {
            status: !!config,
            data: new ConfigDto(config)
        }
    }
    async reset (id, account) {
        return await this.updateConfigById(id, account, {
            theme_color: DEFAULT_CONFIG.theme_color,
            notifications: DEFAULT_CONFIG.notifications
        })
    }
    async update (account, newData) {
        return await this.updateConfig(account, {
            theme_color: newData.theme_color,
            notifications: newData.notifications
        })
    }
}

module.exports = new ConfigService();