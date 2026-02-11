import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { users } from "../models/schema.js";
import { HttpError } from "../utils/HttpError.js";
import * as repository from "../repositories/expense.repository.js";
import { findByCategory } from "../repositories/category.repository.js";

export const validateUser = async (userId) => {
    if (!userId) {
        throw new HttpError(400, "INVALID_USER_ID", `User ID is required`);
    }
    const userExists = await db.select().from(users).where(eq(users.id, userId));
    if (userExists.length === 0) {
        throw new HttpError(404, "INVALID_USER_ID", `User with ID ${userId} does not exists`);
    }
}

export const validateCategory = async (category) => {
    const categoryExists = await findByCategory(category);
    if (categoryExists.length === 0) {
        throw new HttpError(404, "INVALID_CATEGORY", `Category '${category}' does not exist. Valid categories are: EMI, Food, Transport, Healthcare, Rent, Other`);
    }

    return categoryExists[0];
}

export const createExpense = async (data) => {
    await validateUser(data.userId);
    const category = await validateCategory(data.category);

    const { category: categoryName, ...rest } = data;
    data = { ...rest, categoryId: category.id };

    await repository.create(data);
}

export const getExpenseById = async (expenseId, userId) => {
    await validateUser(userId);
    const expense = await repository.findById(expenseId, userId);
    if (expense.length === 0) {
        throw new HttpError(404, "EXPENSE_NOT_FOUND", `Expense with id '${expenseId}' does not exist`);
    }

    return expense[0];
}

export const updateExpense = async (expenseId, userId, data) => {
    await getExpenseById(expenseId, userId);

    if (data.category) {
        const category = await validateCategory(data.category);
        const { category: categoryName, ...rest } = data;
        data = { ...rest, categoryId: category.id };
    }

    await repository.update(expenseId, data);
}

export const deleteExpense = async (expenseId, userId) => {
    await validateUser(userId);
    const expense = await repository.findById(expenseId, userId);
    if (expense.length === 0) {
        throw new HttpError(404, "EXPENSE_NOT_FOUND", `Expense with id '${expenseId}' does not exist`);
    }
    await repository.deleteById(expenseId, userId);
}