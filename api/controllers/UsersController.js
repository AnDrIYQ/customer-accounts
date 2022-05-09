class UserController {
    async get(req, res, next) {
        try {
            res.status(200).json({status: true, message: 'Work'})
        } catch(e) {
            next(e);
        }
    }
    async put(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async edit(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
    async drop(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();