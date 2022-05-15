module.exports = class ImageDto {
    id;
    filename;
    path;

    constructor(model) {
        this.id = model._id;
        this.filename = model.filename;
        this.path = model.path;
    }
}