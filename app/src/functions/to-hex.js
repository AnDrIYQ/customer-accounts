function ColorToHex(color) {
    const hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export default function rgbToHex(rgb) {
    const [red, green, blue] = rgb.replace('rgb(', '').replace(')', '').split(',')
    return "#" + ColorToHex(parseInt(red)) + ColorToHex(parseInt(green)) + ColorToHex(parseInt(blue));
}