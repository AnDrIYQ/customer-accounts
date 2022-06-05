const { isHexColor, isRgbColor, isBoolean, } = require("validator");
module.exports = function(theme_color, notifications) {
        return (isHexColor(theme_color?.toString()) || isRgbColor(theme_color?.toString())) &&
                isBoolean(notifications);
}