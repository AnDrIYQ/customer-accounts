module.exports = class TariffDto {
    id;
    name;
    description;
    price;
    fields;
    terms;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.description = model.description;
        this.price = model.price;
        this.fields = model.fields;
        this.terms = model.terms;
    }
}