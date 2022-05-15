const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true}
})

module.exports = model('Image', ImageSchema);