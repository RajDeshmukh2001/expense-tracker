import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { categories } from "../models/schema.js";

export const findByCategory = async (category) => {
    return await db.select().from(categories).where(eq(categories.category, category));
}

export const create = async (category) => {
    return db.insert(categories).values({ category });
}