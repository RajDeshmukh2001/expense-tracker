import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { expenses } from "../models/schema.js";

export const create = async (data) => {
    return await db.insert(expenses).values(data);
};

export const findById = async (id, userId) => {
    return await db.select().from(expenses).where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}

export const deleteById = async (id, userId) => {
    return await db.delete(expenses).where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}

export const update = async (id, userId, data) => {
    return await db.update(expenses).set(data).where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
}