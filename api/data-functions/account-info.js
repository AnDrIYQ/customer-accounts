const {base64decode} = require("nodejs-base64");

module.exports = function (request) {
    return JSON.parse(base64decode(request.headers.authorization.split(' ')[1].split('.')[1]));
}