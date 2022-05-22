module.exports = function checkRGB(input) {
    let i, elem, validRGB;
    validRGB = false;
    // if input is within “rgb(”x,x,x“)“, should continue to execute
    if ((input.slice(0, 4) === "rgb(") && (input.slice(-1) === ")")) {
        // Getting only "x, x, x," elements and make them array;
        elem = input.slice(4, -1).split(",");
        // Looping through array elements
        for (i = 0; i < elem.length; i++) {
            elem[i] = parseInt(elem[i]);
            // if array elements > 0 and <= 255 , return true;
            if ((elem[i] >= 0 && elem[i] <= 255)) {
                validRGB = true;
            } else {
                validRGB = false;
                break;
            }
        }
    }
    return validRGB;
};