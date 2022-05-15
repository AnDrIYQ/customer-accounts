module.exports = class CurrencyDto {
    id;
    name;
    symbol;

    constructor(model) {
        this.name = model.name;
        this.symbol = model.symbol;
        this.id = model._id;
    }
}