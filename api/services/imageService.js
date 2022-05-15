const ImageModel = require('../models/image-model');
const ImageDto = require('../dtos/image-dto');
const ApiError = require('../exceptions/api-error')

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

class ImageService {
    uploadMiddleware (field) {
        return multer({
            limits: {fileSize: 200 * 1024 * 1024},
            storage,
            fileFilter: (req, file, cb) => {
                if (
                    file.mimetype === 'image/png' ||
                    file.mimetype === 'image/jpeg' ||
                    file.mimetype === 'image/jpg'
                ) {
                    cb(null, true);
                } else {
                    cb(null, false);
                    const err = new Error('Only .jpg .jpeg .png images are supported!');
                    err.name = 'ExtensionError';
                    return cb(err);
                }
            },
        }).array(field, 10);
    }
}

module.exports = new ImageService();