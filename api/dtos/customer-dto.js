module.exports = class CustomerDto {
    id;
    username;
    bio;
    config;
    services;
    messages;
    invoices;

    constructor(model) {
        this.id = model._id;
        this.username = model.username;
        this.bio = model.bio;
        this.config = model.config;
        this.services = model.services;
        this.messages = model.messages;
        this.invoices = model.invoices;
    }
}