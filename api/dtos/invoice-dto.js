module.exports = class InvoiceDto {
    id;
    number;
    description;
    price;
    date_of_charge;
    customer;
    paid;
    was_read;
    items;

    constructor(model) {
        this.id = model._id;
        this.number = model.number;
        this.description = model.description;
        this.price = model.price;
        this.date_of_charge = model.date_of_charge;
        this.customer = model.customer;
        this.paid = model.paid;
        this.was_read = model.was_read;
        this.items = model.items;
    }
}