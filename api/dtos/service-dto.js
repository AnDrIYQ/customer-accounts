module.exports = class ServiceDto {
    id;
    name;
    description;
    tariff;
    customer;
    date;
    date_to;
    price;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.description = model.description;
        this.tariff = model.tariff;
        this.customer = model.customer;
        this.date = model.date;
        this.date_to = model.date_to;
        this.price = model.price;
    }
}