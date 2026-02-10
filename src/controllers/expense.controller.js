import * as service from "../services/expense.service.js";

export const createExpense = async (req, res, next) => {
    try {
        await service.createExpense(req.body);
        res.status(201).json({ message: "Expense created successfully" });
    } catch (error) {
        next(error);
    }
}

export const getExpenseById = async (req, res, next) => {
    try {
        const expense = await service.getExpenseById(req.params.id);
        res.status(201).json(expense);
    } catch (error) {
        next(error);
    }
}