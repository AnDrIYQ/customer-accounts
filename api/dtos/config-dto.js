module.exports = class ConfigDto {
    id;
    image;
    theme_color;
    notifications;
    currency;

    constructor(model) {
        this.id = model._id;
        this.image = model.image;
        this.theme_color = model.theme_color;
        this.notifications = model.notifications;
        this.currency = model.currency;
    }
}