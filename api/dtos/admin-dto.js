module.exports = class AdminDto {
    id;
    username;
    bio;

    constructor(model) {
        this.id = model._id;
        this.username = model.username;
        this.bio = model.bio;
    }
}