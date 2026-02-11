import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { expenses } from "../models/schema.js";

export const create = async (data) => {
    return await db.insert(expenses).values(data);
};

export const findById = async (id, userId) => {
    return await db.select().from(expenses).where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}