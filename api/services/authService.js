const UserModel = require('../models/user-model');
const AdminModel = require('../models/admin-model');
const CustomerModel = require('../models/customer-model');
const TokenModel = require('../models/token-model');
const ConfigModel = require('../models/config-model');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const AdminDto = require('../dtos/admin-dto');
const ConfigDto = require('../dtos/config-dto');
const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/tokenService')
const {ObjectId} = require("mongodb");
const CustomerDto = require("../dtos/customer-dto");

class AuthService {
    async register (email, password, username, bio) {
        const user = await UserModel.findOne({email});
        if (user) {
            throw ApiError.BadRequest(`Користувач з логіном ${email} вже існує`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const customerConfig = await ConfigModel.create({});
        customerConfig.save();
        const newCustomer = await CustomerModel.create({
            username,
            bio,
            config: customerConfig._id
        });
        newCustomer.save();
        const newUser = await UserModel.create({
            email,
            password: hashPassword,
            customer_status: newCustomer._id
        })
        newUser.save();

        const userDTO = new UserDto(newUser);
        const customerDTO = new CustomerDto(newCustomer);
        const configDTO = new ConfigDto(customerConfig);

        const tokens = tokenService.generateTokens({...userDTO, customer: customerDTO, config: configDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO,
            customer: customerDTO,
            config: configDTO
        }
    }
    async login (email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Користувача не існує');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Невірний пароль');
        }

        let customerData;
        let adminData;
        let config;

        const customer = await CustomerModel.findById(user.customer_status);
        const admin = await AdminModel.findById(user.admin_status);

        if (!admin && !customer) {
            throw ApiError.BadRequest('Цього клієнта або адміністратора не існує');
        }

        if (customer) {
            config = await ConfigModel.findOne({_id: ObjectId(customer.config)});
            customerData = new CustomerDto(customer);
        }
        if (admin) {
            config = await ConfigModel.findOne({_id: ObjectId(admin.config)});
            adminData = new AdminDto(admin);
        }

        const configData = new ConfigDto(config);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto, admin: adminData, customer: customerData, config: configData});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            customer: customerData,
            admin: adminData,
            config: configData
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(token) {
        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(token);
        const tokenFromDb = await tokenService.findToken(token);
        if (!tokenFromDb || !userData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);

        let customerData;
        let adminData;
        let config;

        const customer = await CustomerModel.findById(user.customer_status);
        const admin = await AdminModel.findById(user.admin_status);

        if (customer) {
            config = await ConfigModel.findOne({_id: ObjectId(customer.config)});
            customerData = new CustomerDto(customer);
        }
        if (admin) {
            config = await ConfigModel.findOne({_id: ObjectId(admin.config)});
            adminData = new AdminDto(admin);
        }

        const configData = new ConfigDto(config);

        const tokens = tokenService.generateTokens({...userDto, admin: adminData, customer: customerData, config: configData});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            customer: customerData,
            admin: adminData,
            config: configData
        }
    }

    async registerAdmin(email, password, username, bio) {
        const user = await UserModel.findOne({email});
        if (user) {
            throw ApiError.BadRequest(`Обліковий запис ${email} вже існує`);
        }
        const isPassAdmin = password === process.env.ADMIN_REGISTER_KEY;
        if (!isPassAdmin) {
            throw ApiError.AccessError();
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const adminConfig = await ConfigModel.create({});
        adminConfig.save();
        const newAdmin = await AdminModel.create({
            username,
            bio,
            config: adminConfig._id
        });
        newAdmin.save();
        const newUser = await UserModel.create({
            email,
            password: hashPassword,
            admin_status: newAdmin._id
        })
        newUser.save();
        const userDTO = new UserDto(newUser);
        const adminDTO = new AdminDto(newAdmin);
        const configDTO = new ConfigDto(adminConfig);

        const tokens = tokenService.generateTokens({...userDTO, ...adminDTO, ...configDTO})
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO,
            admin: adminDTO,
            config: configDTO
        }
    }
    async remove(email) {
        const account = await UserModel.findOne({email});
        account.remove();
        await TokenModel.remove({user: account._id});
        return true;
    }
}

module.exports = new AuthService();