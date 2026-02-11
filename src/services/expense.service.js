import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { users } from "../models/schema.js";
import { HttpError } from "../utils/HttpError.js";
import * as repository from "../repositories/expense.repository.js";
import { findByCategory } from "../repositories/category.repository.js"

export const createExpense = async (data) => {
    const user = await db.select().from(users).where(eq(users.id, data.userId));
    if (user.length === 0) {
        throw new HttpError(404, "INVALID_USER_ID", `User with id ${data.userId} does not exists`);
    }

    const category = await findByCategory(data.category);
    if (category.length === 0) {
        throw new HttpError(404, "INVALID_CATEGORY", `Category '${data.category}' does not exist. Valid categories are: EMI, Food, Transport, Healthcare, Rent, Other`);
    }

    const { category: categoryName, ...rest } = data;
    const expenseData = { ...rest, categoryId: category[0].id };

    await repository.create(expenseData);
}