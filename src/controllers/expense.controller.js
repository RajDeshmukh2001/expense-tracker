import * as service from "../services/expense.service.js";

export const createExpense = async (req, res, next) => {
    try {
        await service.createExpense(req.body);
        res.status(201).json({ message: "Expense created successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}