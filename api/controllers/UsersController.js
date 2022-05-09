class UserController {
    async get(req, res, next) {
        try {
            res.status(200).json({status: true, message: 'Work'})
        } catch(e) {
            res.status(500).json({status: false, message: e});
        }
    }
    async put(req, res, next) {
        try {

        } catch(e) {

        }
    }
    async edit(req, res, next) {
        try {

        } catch(e) {

        }
    }
    async delete(req, res, next) {
        try {

        } catch(e) {

        }
    }
    async drop(req, res, next) {
        try {

        } catch(e) {

        }
    }
}

module.exports = new UserController();