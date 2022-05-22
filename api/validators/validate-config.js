const { isHexColor, isRgbColor, isBoolean, } = require("validator");
module.exports = function(theme_color, notifications) {
        return (isHexColor(theme_color) || isRgbColor(theme_color)) &&
                isBoolean(notifications);
}