module.exports = class FieldDto {
    id;
    title;
    type;
    value;
    tariff;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.type = model.type;
        this.value = model.value;
        this.tariff = model.tariff;
    }
}