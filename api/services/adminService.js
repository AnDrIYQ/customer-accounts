const AdminModel = require('../models/admin-model');
const UserModel = require('../models/user-model');
const AdminDto = require('../dtos/admin-dto');
const ApiError = require('../exceptions/api-error')

class AdminService {
    async updateAdmin (name, bio, accountInfo) {
        const user = await UserModel.findOne({email: accountInfo.email});
        if (!user) {
            throw new ApiError.BadRequest("This admin does not exists");
        }
        const admin = await AdminModel.findOne({_id: user.admin_status});
        if (!admin) {
            throw new ApiError.BadRequest("This admin does not exists");
        }
        if (accountInfo.id !== user._id.toString() || accountInfo.admin.id !== admin._id.toString()) {
            throw new ApiError.AccessError();
        }
        admin.username = name;
        if (bio) {
            admin.bio = bio;
        }
        const isSaved = await admin.save();
        return {
            status: !!isSaved,
            data: new AdminDto(admin)
        };
    }
}

module.exports = new AdminService();