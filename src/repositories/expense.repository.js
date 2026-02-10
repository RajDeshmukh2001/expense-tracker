import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { expenses } from "../models/schema.js";

export const create = async (data) => {
    return await db.insert(expenses).values(data);
};

export const findById = async (id) => {
    return await db.select().from(expenses).where(eq(expenses.id, id));
}