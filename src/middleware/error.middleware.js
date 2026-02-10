export const errorMiddleware = (err, req, res, next) => {
    const status = err.statusCode || 500;

    res.status(status).json({
        error: {
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.message || "Something went wrong",
        },
    });
};