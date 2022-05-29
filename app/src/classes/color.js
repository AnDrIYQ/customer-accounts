import isHexColor from "validator/es/lib/isHexColor";
import isRgbColor from "validator/es/lib/isRgbColor";
import toHex from "../functions/to-hex"

export class Color {
    value = '#000'
    constructor(color) {
        if (isHexColor(color)) {
            this.value = color.toString();
        } else if (isRgbColor(color)) {
            this.value = toHex(color);
        }
    }
}