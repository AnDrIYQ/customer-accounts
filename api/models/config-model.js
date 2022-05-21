const { Schema, model } = require('mongoose');
const DEFAULT_CONFIG = require('../data-functions/default-config')

const ConfigSchema = new Schema({
    image: {type: Schema.Types.ObjectId, rel: 'Image', required: false},
    theme_color: {type: String, required: false, default: DEFAULT_CONFIG.theme_color},
    notifications: {type: Boolean, required: false, default: true},
    currency: {type: Schema.Types.ObjectId, rel: 'Currency', required: false}
})

module.exports = model('Config', ConfigSchema);