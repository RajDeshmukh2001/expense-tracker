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
        const expenseId = req.params.id;
        const userId = req.header("user-id");
        const expense = await service.getExpenseById(expenseId, userId);
        res.status(201).json(expense);
    } catch (error) {
        next(error);
    }
}

export const updateExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const userId = req.header("user-id");
        await service.updateExpense(expenseId, userId, req.body);
        res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const userId = req.header("user-id");
        await service.deleteExpense(expenseId, userId);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        next(error);
    }
}