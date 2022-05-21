module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, messages, errors = []) {
        super(messages);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized');
    }
    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static AccessError() {
        return new ApiError(403, 'Access denied');
    }
    static NotChanged() {
        return new ApiError(503, 'Data Base not updated');
    }
}