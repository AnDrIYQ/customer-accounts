module.exports = class MessageDto {
    id;
    message;
    from;
    to;
    date;
    invoice;

    constructor(model) {
        this.id = model._id;
        this.message = model.message;
        this.from = model.from;
        this.to = model.to;
        this.date = model.date;
        this.invoice = model.invoice;
    }
}