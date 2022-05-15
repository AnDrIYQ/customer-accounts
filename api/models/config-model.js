const { Schema, model } = require('mongoose');

const ConfigSchema = new Schema({
    image: {type: Schema.Types.ObjectId, rel: 'Image', required: false},
    theme_color: {type: String, required: false, default: 'rgb(26, 86, 219)'},
    notifications: {type: Boolean, required: false, default: true},
    currency: {type: Schema.Types.ObjectId, rel: 'Currency', required: false}
})

module.exports = model('Config', ConfigSchema);