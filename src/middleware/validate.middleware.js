import { HttpError } from "../utils/HttpError.js";

export const validate = (schema) => {
    return (req, res, next) => {
        if (Object.entries(req.body).length === 0) {
            throw new HttpError(400, "INVALID_DATA", "Request body is missing or empty")
        }
        
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const error = result.error?.issues?.[0]?.message;
            return res.status(400).json({
                error: {
                    code: "INVALID_EXPENSE_DATA",
                    message: error,
                },
            });
        }

        req.body = result.data;
        next();
    };
};