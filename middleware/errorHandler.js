const BAD_REQUEST = 400;
const UNAUTHORISED_ACEES = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case BAD_REQUEST:
            res.json({ title: "BAD_REQUEST", 
            message: err.message, stackTrace: err.stack });

            break;

        case UNAUTHORISED_ACEES:
            res.json({ title: "UNAUTHORISED_ACEES", 
            message: err.message, stackTrace: err.stack });

            break;

        case FORBIDDEN:
            res.json({ title: "FORBIDDEN", 
            message: err.message, stackTrace: err.stack });

            break;

        case NOT_FOUND:
            res.json({ title: "NOT_FOUND", 
            message: err.message, stackTrace: err.stack });

            break;

        case INTERNAL_SERVER_ERROR:
            res.json({ title: "INTERNAL_SERVER_ERROR", 
            message: err.message, stackTrace: err.stack });

            break;

        default:
            res.json({ title: "UNKNOWN ERROR OCCURE", 
            message: err.message, stackTrace: err.stack });

            break;
    }
};

module.exports = errorHandler;