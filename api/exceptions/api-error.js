module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, messages, errors = []) {
        super(messages);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Користувач не авторизований');
    }
    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static AccessError() {
        return new ApiError(403, 'Відмовлено у доступі');
    }
    static NotChanged() {
        return new ApiError(503, 'Базу даних не оновлено');
    }
}